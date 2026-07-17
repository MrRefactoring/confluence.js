---
title: Страницы
description: Создание, чтение, обновление и удаление страниц Confluence через confluence.js — форматы тела, версии, дерево страниц, перемещение и копирование.
---

# Страницы

Страницы — родная территория v2. Из операций над страницами v1 нужен только там, где перестраивается дерево: перемещение, копирование, архивация.

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({ host, auth });
```

## Создание

```ts
const page = await confluence.page.createPage({
  body: {
    spaceId: '123456',
    status: 'current',
    title: 'Release notes',
    body: {
      representation: 'storage',
      value: '<p>Выкатили сегодня.</p>',
    },
  },
});
```

`representation: 'storage'` — собственный XHTML-подобный формат Confluence, тот самый, который редактор гоняет туда-обратно без потерь. Принимаются также `atlas_doc_format` (ADF) и `wiki`.

Чтобы вложить страницу в другую, передайте `parentId`:

```ts
await confluence.page.createPage({
  body: {
    spaceId: '123456',
    parentId: String(page.id),
    status: 'current',
    title: 'Release notes — 3.0',
    body: { representation: 'storage', value: '<p>Подробности.</p>' },
  },
});
```

## Чтение

```ts
const page = await confluence.page.getPageById({ id: 12345, bodyFormat: 'storage' });

console.log(page.title, page.version?.number);
console.log(page.body?.storage?.value);
```

Без `bodyFormat` тело не возвращается — запрашивайте то представление, которое собираетесь читать.

Список по пространству:

```ts
const pages = await confluence.page.getPages({ spaceId: ['123456'], limit: 25 });

for (const page of pages.results ?? []) console.log(page.title);
```

## Обновление

Обновление — это новая версия, и вы обязаны сказать, какую именно создаёте: Confluence использует номер для оптимистичной блокировки.

```ts
const current = await confluence.page.getPageById({ id: 12345 });

await confluence.page.updatePage({
  id: 12345,
  body: {
    id: '12345',
    status: 'current',
    title: 'Release notes (уточнено)',
    body: { representation: 'storage', value: '<p>Теперь с деталями.</p>' },
    version: { number: (current.version?.number ?? 1) + 1 },
  },
});
```

Пришлёте `version.number`, не равный `current + 1`, — вызов отклонят. В этом и смысл: значит, страницу успел отредактировать кто-то ещё.

## Удаление

```ts
await confluence.page.deletePage({ id: 12345 });
```

Это перенос в корзину. `purge: true` удаляет насовсем, `draft: true` удаляет черновик.

## Версии

```ts
const versions = await confluence.version.getPageVersions({ id: 12345 });

for (const version of versions.results ?? []) {
  console.log(`v${version.number} — ${version.message ?? 'без комментария'}`);
}
```

Восстановление и удаление версий — это v1:

```ts
const v1 = createV1Client({ host, auth });

await v1.contentVersions.restoreContentVersion({
  id: '12345',
  operationKey: 'restore',
  params: { versionNumber: 3, message: 'вернули хорошую' },
});
```

::: warning Номер версии — это позиция, а не идентификатор
Удаление версии 2 из `[4,3,2,1]` оставляет `[3,2,1]` — всё, что выше дырки, съезжает вниз и закрывает её. Номер версии, который вы держали до удаления, теперь указывает на **другую** версию. Перечитывайте историю после любого удаления.
:::

## Дерево страниц

v2 его читает:

```ts
const children = await confluence.children.getPageChildren({ id: 12345 });
const descendants = await confluence.descendants.getPageDescendants({ id: 12345 });
const ancestors = await confluence.ancestors.getPageAncestors({ id: 12345 });
```

v1 его меняет:

```ts
// Перемещение: 'append' делает страницу дочерней к целевой, 'before'/'after' ставят её соседом.
await v1.contentChildrenAndDescendants.movePage({
  pageId: '12345',
  position: 'append',
  targetId: '67890',
});

// Копирование одной страницы.
const copy = await v1.contentChildrenAndDescendants.copyPage({
  id: '12345',
  destination: { type: 'parent_page', value: '67890' },
  pageTitle: 'Release notes (копия)',
  copyAttachments: true,
});
```

Копирование целой иерархии асинхронно — вы получаете задачу, а не результат:

```ts
const task = await v1.contentChildrenAndDescendants.copyPageHierarchy({
  id: '12345',
  destinationPageId: '67890',
  copyAttachments: true,
  titleOptions: { prefix: 'Копия ' },
});

// Опрашиваем до завершения.
let status = await v1.longRunningTask.getTask({ id: task.id! });

while (!status.finished) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  status = await v1.longRunningTask.getTask({ id: task.id! });
}
```

Архивация устроена так же — `content.archivePages` возвращает задачу.
