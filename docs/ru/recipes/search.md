---
title: Поиск (CQL)
description: Поиск в Confluence через confluence.js — searchByCQL против searchContentByCQL, постраничность и курсоры, и почему свежий контент находится не сразу.
---

# Поиск (CQL)

CQL — Confluence Query Language — существует **только в v1**. В v2 языка запросов нет вообще, так что это один из тех эндпоинтов, ради которых v1 и живёт.

```ts
import { createV1Client } from 'confluence.js';

const confluence = createV1Client({ host, auth });
```

## Два эндпоинта, два разных ответа

Выглядят взаимозаменяемыми, но это не так:

```ts
// Результаты поиска: обёртка с entityType, excerpt, score — и контентом внутри.
const hits = await confluence.search.searchByCQL({ cql: 'type=page', limit: 25 });

for (const hit of hits.results) {
  console.log(hit.entityType, hit.content?.title, hit.excerpt);
}

// Поиск по контенту: сами объекты контента, без обёртки.
const contents = await confluence.content.searchContentByCQL({ cql: 'type=page', limit: 25 });

for (const content of contents.results) {
  console.log(content.type, content.title, content.status);
}
```

`searchByCQL` — когда нужны метаданные поиска: релевантность, фрагменты, тип совпадения. `searchContentByCQL` — когда нужен просто контент и вы бы всё равно разворачивали каждый результат.

## Запросы, которые стоит утащить

```ts
// Всё в пространстве
{ cql: 'space="DOCS"' }

// Страницы с меткой
{ cql: 'type=page and label="release-notes"' }

// Недавно изменённое, свежее сверху
{ cql: 'lastModified > now("-7d") order by lastModified desc' }

// Полнотекстовый поиск в пределах пространства
{ cql: 'space="DOCS" and text ~ "deployment"' }

// Конкретная страница
{ cql: 'id=12345' }

// Всё, что создал человек
{ cql: 'creator = "5b6d7f20e6dba529eefdbad9"' }
```

Полную грамматику Atlassian описывает в [Advanced Searching using CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).

## Некорректный CQL — это ошибка, а не пустой результат

```ts
import { ApiError } from 'confluence.js';

try {
  await confluence.search.searchByCQL({ cql: 'это не cql' });
} catch (error) {
  if (error instanceof ApiError && error.status === 400) {
    // Запрос не распарсился — это стоит показать, а не проглотить.
  }
}
```

На это можно опираться: опечатка в запросе падает громко, а не возвращает тихо пустоту.

## Постраничность

`searchByCQL` листается через `start`/`limit` и сообщает полное число совпадений отдельно от размера страницы:

```ts
const page = await confluence.search.searchByCQL({ cql: 'type=page', limit: 25, start: 0 });

console.log(page.results.length); // ≤ 25
console.log(page.totalSize);      // все совпадения, а не только эта страница
```

`searchContentByCQL` вместо этого использует курсор:

```ts
let cursor: string | undefined;

do {
  const page = await confluence.content.searchContentByCQL({ cql: 'type=page', limit: 50, cursor });

  for (const content of page.results) handle(content);

  cursor = page._links?.next ? new URL(page._links.next, host).searchParams.get('cursor') ?? undefined : undefined;
} while (cursor);
```

## Пользователи

```ts
const users = await confluence.search.searchUser({ cql: 'user.fullname ~ "Алекс"' });
```

Учтите: у поиска пользователей своя грамматика и свои поля CQL.

## Свежий контент находится не сразу

Поиск читает индекс, а индекс отстаёт от записи — обычно на секунды, но на нагруженном сайте на минуты. Только что созданная страница действительно ещё не находится, и это не ошибка: вызов проходит и возвращает пустоту. Поэтому опрашивайте **значение**, а не исключение:

```ts
async function waitForIndex(pageId: string, attempts = 6) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const hits = await confluence.search.searchByCQL({ cql: `id=${pageId}` });

    if (hits.results.length > 0) return hits.results[0];

    await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
  }

  return undefined;
}
```

`withRetry` из `confluence.js/core` здесь **не поможет**: он реагирует только на `ApiError` со статусом 429/502/503/504, а пустой результат — не то и не другое.

Если нужен read-your-write, не используйте поиск вовсе: `v2.page.getPageById` согласован сразу после записи.
