---
title: Обработка ошибок
description: Как confluence.js сообщает о сбоях — ApiError для не-2xx ответов, ZodError при расхождении Atlassian с собственной спекой, и статусы, которые на самом деле данные.
---

# Обработка ошибок

До вас доходят два вида сбоев, и означают они разное.

## `ApiError` — API отказал

Любой не-2xx ответ бросает `ApiError` со статусом и разобранным телом:

```ts
import { ApiError } from 'confluence.js';

try {
  await confluence.page.getPageById({ id: 42 });
} catch (error) {
  if (error instanceof ApiError && error.status === 404) {
    console.log('такой страницы нет');
  } else {
    throw error;
  }
}
```

```ts
class ApiError extends Error {
  status: number;       // 404
  statusText: string;   // 'Not Found'
  body: unknown;        // разобранное тело ошибки Atlassian
}
```

В `body` Confluence объясняет себя. Его стоит логировать: сообщение внутри обычно куда конкретнее статуса.

```ts
catch (error) {
  if (error instanceof ApiError) {
    console.error(error.status, JSON.stringify(error.body));
  }
}
```

## `ZodError` — Atlassian разошёлся со своей спекой

Каждый ответ проверяется схемой Zod, повторяющей OpenAPI-спеку Atlassian. Если ответ не совпал, вы получаете `ZodError`, а не молча неверный объект:

```ts
import { ZodError } from 'zod';

try {
  await confluence.page.getPageById({ id: 12345 });
} catch (error) {
  if (error instanceof ZodError) {
    // API вернул то, чего его же спека не описывает.
  }
}
```

Это не ваша ошибка. Это значит, что живой API и опубликованная спека разошлись: поле, задокументированное как обязательное, пришло `null`, или в enum добавилось значение. Такое стоит [завести issue](https://github.com/MrRefactoring/confluence.js/issues) — чинить это надо здесь, в пакете, и каждый такой случай делает типы правдивее для всех.

## Некоторые статусы — это данные, а не сбой

На часть вопросов Confluence отвечает кодом статуса. Формально это `ApiError`, но ошибка **и есть** ответ:

```ts
// «Ограничен ли этому пользователю доступ к странице?»
// 404 = его нет в списке ограничений. 200 = есть.
const restricted = await confluence.contentRestrictions
  .getContentRestrictionStatusForUser({ id: pageId, operationKey: 'read', accountId })
  .then(() => true)
  .catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) return false;
    throw error;
  });
```

Ещё несколько, все найдены на живом API:

| Вызов | Неожиданность |
|---|---|
| `group.getGroupMembersByGroupId` с несуществующей группой | пустая страница, **а не** 404 |
| `contentStates.getContentsWithState` с неизвестным state-id | пустая страница, не ошибка |
| `themes.getGlobalTheme` на сайте с темой по умолчанию | **404** — у «нет темы» нет объекта |
| `content.archivePages` с несуществующим id страницы | **500** — работа ставится в очередь до проверки id |
| `relation.findTargetFromSource` для `favourite` | **501** — Atlassian это не реализовал |
| `spacePermissions.addPermissionToSpace` на сайте в roles-only режиме | **400** — классические права выключены на всём сайте; используйте v2 `spaceRoles` |

## За вашей спиной ничего не повторяется

`4xx` не повторяется никогда — включая `429`. Повторы включаются явно и покрывают только транспортные сбои, см. [Повторы запросов](./retries).
