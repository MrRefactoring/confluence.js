---
title: Метки
description: Добавление, чтение и удаление меток Confluence через confluence.js — v2 для чтения, v1 для записи, и поиск контента по метке.
---

# Метки

Ещё одно разделение: **v2 читает метки, v1 их пишет.**

```ts
import { createV1Client, createV2Client } from 'confluence.js';

const v2 = createV2Client({ host, auth });
const v1 = createV1Client({ host, auth });
```

## Добавление — v1

```ts
await v1.contentLabels.addLabelsToContent({
  id: '12345',
  body: [{ prefix: 'global', name: 'release-notes' }],
});
```

Тело — **массив**, поэтому несколько меток ставятся одним вызовом:

```ts
await v1.contentLabels.addLabelsToContent({
  id: '12345',
  body: [
    { prefix: 'global', name: 'release-notes' },
    { prefix: 'global', name: 'public' },
  ],
});
```

Префиксы: `global` — обычная общая метка, `my` — личная ваша, `team` — командная.

## Чтение — v2

```ts
const labels = await v2.label.getPageLabels({ id: 12345 });

for (const label of labels.results ?? []) console.log(label.prefix, label.name);
```

Аналоги есть для каждого контейнера и для всего сайта:

```ts
await v2.label.getBlogPostLabels({ id: 12345 });
await v2.label.getAttachmentLabels({ id: 'att67890' });
await v2.label.getCustomContentLabels({ id: 12345 });
await v2.label.getSpaceLabels({ id: 123456 });         // метки самого пространства
await v2.label.getSpaceContentLabels({ id: 123456 });   // метки контента в пространстве
await v2.label.getLabels({ limit: 100 });               // все метки сайта
```

## Удаление — v1

```ts
await v1.contentLabels.removeLabelFromContent({ id: '12345', label: 'release-notes' });
```

Есть второй вариант, принимающий имя query-параметром — для имён, которые не переживают путь URL:

```ts
await v1.contentLabels.removeLabelFromContentUsingQueryParameter({ id: '12345', name: 'has/slash' });
```

## Поиск контента по метке

Обратное направление — `labelInfo`, только v1:

```ts
const details = await v1.labelInfo.getAllLabelContent({ name: 'release-notes' });

for (const content of details.associatedContents?.results ?? []) {
  console.log(content.contentType, content.contentId, content.title);
}
```

::: warning Это не объекты контента
Каждая запись — `{ contentType, contentId, title }`: **числовой** `contentId` и никакого `id`. Все остальные листинги v1 отдают контент со строковым `id`, поэтому на этом легко споткнуться:

```ts
const ids = details.associatedContents?.results?.map(c => String(c.contentId)) ?? [];
```
:::

Сузить по типу и полистать:

```ts
await v1.labelInfo.getAllLabelContent({ name: 'release-notes', type: 'blogpost', limit: 25, start: 0 });
```

Или искать то же самое через CQL — он лучше комбинируется:

```ts
await v1.search.searchByCQL({ cql: 'type=page and label="release-notes"' });
```

::: tip Метка существует, только пока её кто-то носит
Реестра меток нет. Спросите `getAllLabelContent` про имя, которого никто не использует, — получите `ApiError`, а не пустой список: метки действительно не существует. То же самое с подпиской на неё.
:::

## Метки пространства

Метки пространств — это снова другой API, и живёт он в `experimental`:

```ts
await v1.experimental.addLabelsToSpace({ spaceKey: 'DOCS', body: [{ prefix: 'global', name: 'product' }] });
const spaceLabels = await v1.experimental.getLabelsForSpace({ spaceKey: 'DOCS', prefix: 'global' });
await v1.experimental.deleteLabelFromSpace({ spaceKey: 'DOCS', name: 'product', prefix: 'global' });
```

`experimental` — собственное название неймспейса у Atlassian: считайте эти эндпоинты изменчивыми.
