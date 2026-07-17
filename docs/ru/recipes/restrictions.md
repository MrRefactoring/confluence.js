---
title: Ограничения доступа
description: Ограничение доступа к страницам Confluence через confluence.js — ограничения контента, проверка прав и подписки. Всё только в v1.
---

# Ограничения доступа

У ограничений контента **нет эквивалента в v2 вообще** — это одна из самых наглядных причин, по которым v1 всё ещё поставляется. Как и `checkContentPermission`, и подписки.

```ts
import { createV1Client } from 'confluence.js';

const confluence = createV1Client({ host, auth });
```

## Кто и что может прямо сейчас

```ts
const restrictions = await confluence.contentRestrictions.getRestrictions({
  id: '12345',
  expand: ['restrictions.user', 'restrictions.group'],
});

for (const restriction of restrictions.results) {
  console.log(restriction.operation); // 'read' | 'update'
  console.log(restriction.restrictions?.user?.results?.map(user => user.displayName));
}
```

Обе операции возвращаются всегда, даже на полностью открытой странице: пустой список ограничений **и есть** ответ «всем можно».

Спросить про одну операцию:

```ts
const read = await confluence.contentRestrictions.getRestrictionsForOperation({ id: '12345', operationKey: 'read' });
```

## Ограничить страницу

```ts
await confluence.contentRestrictions.addRestrictions({
  id: '12345',
  body: [
    {
      operation: 'read',
      restrictions: {
        user: [{ type: 'known', accountId: '5b6d7f20e6dba529eefdbad9' }],
        group: [{ type: 'group', id: groupId }],
      },
    },
  ],
});
```

::: warning Ограничение на чтение закрывает страницу от всех, кого вы не перечислили
Ограничив `read` списком, вы делаете страницу невидимой для всех остальных — включая тех, кто видел её секунду назад. Добавьте себя, иначе можно закрыть себе доступ к собственной странице.
:::

Снять все:

```ts
await confluence.contentRestrictions.deleteRestrictions({ id: '12345' });
```

## Ограничен ли **этот** человек?

```ts
import { ApiError } from 'confluence.js';

async function isRestricted(pageId: string, accountId: string): Promise<boolean> {
  try {
    await confluence.contentRestrictions.getContentRestrictionStatusForUser({
      id: pageId,
      operationKey: 'read',
      accountId,
    });

    return true;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return false;

    throw error;
  }
}
```

::: tip Ответ — это код статуса
Этот эндпоинт отвечает статусом, а не телом: **404 означает «его нет в списке ограничений»**, 200 — что есть. 404 здесь — данные, а не сбой, и по типам этого не видно, поэтому его легко принять за ошибку.
:::

## Может ли пользователь сделать X?

Другой вопрос: не «есть ли ограничение», а «может ли он, с учётом всего»:

```ts
const result = await confluence.contentPermissions.checkContentPermission({
  id: '12345',
  subject: { type: 'user', identifier: accountId },
  operation: 'read', // 'read' | 'update' | 'delete'
});

if (!result.hasPermission) console.log(result.errors);
```

::: warning Отказ — это 200
Вызов проходит и сообщает `hasPermission: false`. Проверяйте поле, а не статус: код, который смотрит только на статус, прочитает каждый отказ как разрешение.
:::

С группами тоже работает — для `type: 'group'` в `identifier` идёт **id** группы, а не её имя:

```ts
await confluence.contentPermissions.checkContentPermission({
  id: '12345',
  subject: { type: 'group', identifier: groupId },
  operation: 'update',
});
```

## Подписки

Тоже только v1. Кто наблюдает за страницей:

```ts
const watches = await confluence.contentWatches.getWatchesForPage({ id: '12345' });
const spaceWatchers = await confluence.contentWatches.getWatchersForSpace({ spaceKey: 'DOCS' });
```

::: danger `getWatchesForSpace` не принимает пространство
Вопреки названию это `/content/{id}/notification/created` — эндпоинт **контента**. Передадите ключ пространства — получите 500. Для пространства нужен `getWatchersForSpace`.
:::

Подписка и отписка:

```ts
await confluence.contentWatches.addContentWatcher({ contentId: '12345', accountId });
const status = await confluence.contentWatches.getContentWatchStatus({ contentId: '12345', accountId });
await confluence.contentWatches.removeContentWatcher({ contentId: '12345', accountId });
```

Создание страницы подписывает вас на неё, поэтому у свежей страницы уже есть один наблюдатель — вы.

Пространства и метки устроены так же:

```ts
await confluence.contentWatches.addSpaceWatcher({ spaceKey: 'DOCS', accountId });
await confluence.contentWatches.isWatchingSpace({ spaceKey: 'DOCS', accountId });

await confluence.contentWatches.addLabelWatcher({ labelName: 'release-notes', accountId });
await confluence.contentWatches.isWatchingLabel({ labelName: 'release-notes', accountId });
```

Метка должна существовать — то есть её должен кто-то носить — прежде чем на неё можно подписаться. Подписка на свободное имя даёт 403, а не 404.
