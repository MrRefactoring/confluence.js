---
title: Обработка ошибок
description: Как confluence.js сообщает о сбоях — свой тип ошибки на каждый статус и предикаты для сужения, NetworkError для транспортных сбоев, OAuthError, и статусы, которые на самом деле данные.
---

# Обработка ошибок

Любой сбой этого клиента — один из его собственных типов ошибок. Ничего не протекает из `fetch`, и нигде нет голого `Error`, из сообщения которого пришлось бы что-то выпарсивать.

## Общая картина

```
Error
├── ApiError            не-2xx от Confluence
│   ├── AuthError       401
│   │   └── ScopeError  401, приложению не выдан нужный scope
│   ├── ForbiddenError  403
│   ├── NotFoundError   404
│   ├── RateLimitError  429, несёт retryAfterMs
│   └── ServerError     5xx
├── NetworkError        ответа не было вовсе — DNS, TLS, сокет, таймаут
├── OAuthError          обмен кода, обновление токена, резолв cloud id
├── ConfigError         клиент нельзя собрать с такой конфигурацией
└── SchemaMismatchError 2xx, который не JSON там, где обещан JSON
```

Плюс `ZodError` от самого Zod, когда JSON разобрался, но его форма разошлась со спекой.

## Сужение типа: лучше предикаты

```ts
import { isNotFoundError, isRateLimitError } from 'confluence.js';

try {
  return await confluence.page.getPageById({ id: 42 });
} catch (error) {
  if (isNotFoundError(error)) return null;

  if (isRateLimitError(error)) {
    await sleep(error.retryAfterMs ?? 60_000);

    return retry();
  }

  throw error;
}
```

`instanceof` тоже работает — `error instanceof NotFoundError`, и каждый подкласс одновременно `instanceof ApiError`. Но начинайте с предикатов. Они проверяют помеченный маркер, а не цепочку прототипов, поэтому продолжают работать, когда в одном `node_modules` оказались две копии пакета — обычный итог транзитивных диапазонов версий, и ровно тот случай, где `instanceof` молча отвечает `false`.

Предикаты: `isApiError`, `isAuthError`, `isForbiddenError`, `isNotFoundError`, `isRateLimitError`, `isServerError`, `isNetworkError`, `isOAuthError`, `isConfigError`, `isSchemaMismatchError`, `isScopeError`, `isReauthorizationRequired`.

## `ApiError` — API отказал

```ts
class ApiError extends Error {
  status: number;       // 404
  statusText: string;   // 'Not Found'
  body: unknown;        // тело ошибки Atlassian, разобранное если это был JSON
}
```

В `body` Confluence объясняет себя, и сообщение внутри обычно куда конкретнее статуса. Его стоит логировать:

```ts
if (isApiError(error)) console.error(error.status, JSON.stringify(error.body));
```

### `RateLimitError`

Добавляет `retryAfterMs`, разобранный из заголовка `Retry-After` — понимаются и секунды, и HTTP-дата, — и `undefined`, если Confluence ничего не сказал.

Повтор **не** делается за вас. Ограничение частоты просит замедлить клиент целиком; повтор одного вызова на месте это лишь маскирует. Если повтор всё же нужен, включите его явно через [`withRetry`](./retries) с `retryRateLimit`.

## `NetworkError` — ответа не было

Сбои DNS, ошибки TLS, оборванные сокеты, таймауты. `fetch` отдаёт их как голый `TypeError: fetch failed`, пряча настоящую причину в `cause`; здесь они оборачиваются, чтобы точка перехвата была одна:

```ts
if (isNetworkError(error)) {
  console.error(error.code);       // 'ECONNRESET'
  console.error(error.transient);  // true — есть смысл повторить
  console.error(error.cause);      // исходный TypeError
}
```

Именно на `transient` смотрит встроенный механизм повторов. Некорректный URL попадает сюда же, но с `transient: false`, поэтому падает сразу, а не после трёх попыток.

## `OAuthError` — не сложилась авторизация

Бросают `exchangeAuthorizationCode`, `refreshOAuth2Token`, `getAccessibleResources`, а также сам клиент, когда не может определить cloud id. Несёт `status` и `body`, если сбой пришёл от auth-эндпоинтов Atlassian.

Намеренно не наследует `ApiError`: «ваш refresh-токен мёртв» — это другая проблема, чем «страницы нет», и код, повторяющий вызовы к Confluence, не должен считать их одинаковыми.

```ts
if (isReauthorizationRequired(error)) {
  // invalid_grant или access_denied — обновление не спасёт, отправьте пользователя на согласие заново.
}
```

## `ZodError` — Atlassian разошёлся с собственной спекой

Каждый ответ валидируется схемой Zod, повторяющей OpenAPI-спеку Atlassian. Несовпадение бросает `ZodError` вместо того, чтобы отдать вам молча неверный объект.

Это не ваша ошибка. Она означает, что живой API и опубликованная спека расходятся: поле, документированное как обязательное, вернулось как `null`, или в enum добавилось значение. Об этом стоит [завести issue](https://github.com/MrRefactoring/confluence.js/issues): исправление принадлежит этому пакету, и каждое такое делает типы правдивее для всех.

Учтите, что `ConfigError` и `ZodError` могут прийти и от самих `createV1Client` / `createV2Client`, синхронно, при некорректной конфигурации — ещё до первого запроса.

## Некоторые статусы — это данные, а не сбой

На часть вопросов Confluence отвечает кодом статуса. Такие вызовы бросают ошибку, но ошибка и **есть** ответ:

```ts
// «Закрыт ли этой учётной записи доступ к странице?»
// 404 = её нет в списке ограничений. 200 = есть.
const restricted = await confluence.contentRestrictions
  .getContentRestrictionStatusForUser({ id: pageId, operationKey: 'read', accountId })
  .then(() => true)
  .catch((error: unknown) => {
    if (isNotFoundError(error)) return false;
    throw error;
  });
```

Остальное, что стоит знать, — всё найдено на живом API:

| Вызов | Неожиданность |
|---|---|
| `group.getGroupMembersByGroupId` с неизвестной группой | пустая страница, а **не** 404 |
| `contentStates.getContentsWithState` с неизвестным id состояния | пустая страница, не ошибка |
| `themes.getGlobalTheme` на сайте с темой по умолчанию | **404** — у «нет темы» нет объекта |
| `content.archivePages` с неизвестным id страницы | **500** — работа ставится в очередь до проверки id |
| `relation.findTargetFromSource` для `favourite` | **501** — Confluence так это и не реализовал |
| `spacePermissions.addPermissionToSpace` на сайте с ролями | **400** — классические права выключены на всём сайте; используйте v2 `spaceRoles` |

## Что повторяется без вашего ведома

По умолчанию — ничего. С настроенным `retry` — только временные транспортные сбои и 502/503/504, ровно та же политика, что применяет [`withRetry`](./retries), поэтому обёртка вызова никогда не меняет набор «временных» сбоев. Ни один 4xx не повторяется, пока вы не включите `retryRateLimit` для 429.
