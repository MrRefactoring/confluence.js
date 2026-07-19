---
title: Повторы запросов
description: confluence.js повторяет только транспортные сбои и только по явной настройке. Почему 429 и другие 4xx не повторяются и как обрабатывать rate limit самому.
---

# Повторы запросов

По умолчанию выключены. Когда включаете — покрывают **только транспортные сбои**:

```ts
const confluence = createV2Client({
  host,
  auth,
  retry: { maxAttempts: 3, initialDelayMs: 500, backoffFactor: 2 },
});
```

| Опция | По умолчанию | Значение |
|---|---|---|
| `maxAttempts` | `1` | всего попыток, включая первую — `1` означает «без повторов» |
| `initialDelayMs` | `500` | пауза перед первым повтором |
| `backoffFactor` | `2` | множитель на каждую следующую попытку |

С настройками выше: попытка, пауза 500 мс, попытка, пауза 1000 мс, попытка, сдаёмся.

## Что повторяется

Только сбои, которые ничего не говорят о вашем запросе:

- **Сетевые ошибки** — `ECONNRESET`, `ETIMEDOUT`, `ENOTFOUND`, `EAI_AGAIN`, `EPIPE`, `UND_ERR_SOCKET`, `ERR_SSL_*`
- **HTTP 502, 503, 504** — прокси или перегруженный сервер, а не ответ

## Что не повторяется никогда

**Любой 4xx, включая 429.** Rate limit — это сигнал притормозить, а не временный сбой, который можно замазать: повтор по таймеру только быстрее сжигает лимит и прячет тот факт, что вы за него вышли. Обрабатывайте осознанно:

```ts
import { isRateLimitError } from 'confluence.js';

try {
  await confluence.page.createPage({ body: page });
} catch (error) {
  if (isRateLimitError(error)) {
    // Совет самого Atlassian, уже разобранный из Retry-After.
    await enqueueAfter(error.retryAfterMs ?? 60_000);

    return;
  }

  throw error;
}
```

**5xx, кроме 502/503/504,** тоже не повторяется. `500` от Confluence означает, что сервер принял запрос и подавился им: повтор обычно воспроизведёт тот же сбой, а замалчивание скроет настоящую ошибку — в API или в том, что вы отправили.

## `withRetry` — та же политика, точечно

Когда повторы нужны вокруг одного вызова, а не всего клиента, помогает `withRetry`:

```ts
import { withRetry } from 'confluence.js/core';

const page = await withRetry(() => confluence.page.getPageById({ id: 12345 }), {
  maxAttempts: 4,
  initialDelayMs: 500,
  backoffFactor: 2,
});
```

Он применяет **ровно ту же политику, что выше** — временные транспортные сбои и 502/503/504, — поэтому обёртка вызова никогда не меняет набор «временных» сбоев. 401, 403, 404 и 500 пробрасываются с первой же попытки.

Чтобы отдельный вызов пережидал rate limit, включите это явно:

```ts
await withRetry(() => confluence.page.createPage({ body: page }), {
  maxAttempts: 3,
  retryRateLimit: true, // ждёт Retry-After, если Confluence его прислал
});
```

::: warning Это не поллер
`withRetry` реагирует только на такие сбои. Обычный `throw` внутри операции не повторяется, поэтому ждать согласованности с его помощью нельзя:

```ts
// ❌ выполнится ровно один раз — брошенный Error не является повторяемым сбоем
await withRetry(async () => {
  const hits = await confluence.search.searchByCQL({ cql: `id=${pageId}` });
  if (!hits.results.length) throw new Error('ещё не проиндексировано');
  return hits.results[0];
});
```

Опрашивайте значение:

```ts
// ✅
async function waitForIndex(pageId: string, attempts = 6) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const hits = await confluence.search.searchByCQL({ cql: `id=${pageId}` });

    if (hits.results.length > 0) return hits.results[0];

    await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
  }

  return undefined;
}
```
:::

## Отложенная согласованность — не ошибка

Confluence не везде read-your-write: страница не сразу появляется в списке, а индексация поиска на нагруженном сайте отстаёт на минуты. Ничего не падает — ответа просто ещё нет, и повторять нечего. Опрашивайте чтение, как выше.

Никогда не повторяйте **запись**. «Упавшее» создание могло на самом деле пройти, и вторая попытка даст вам две страницы.
