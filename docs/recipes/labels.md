---
title: Labels
description: Add, read and remove Confluence labels with confluence.js — v2 for reading, v1 for writing, and finding content by label.
---

# Labels

Another split: **v2 reads labels, v1 writes them.**

```ts
import { createV1Client, createV2Client } from 'confluence.js';

const v2 = createV2Client({ host, auth });
const v1 = createV1Client({ host, auth });
```

## Add — v1

```ts
await v1.contentLabels.addLabelsToContent({
  id: '12345',
  body: [{ prefix: 'global', name: 'release-notes' }],
});
```

The body is an **array**, so several labels go in one call:

```ts
await v1.contentLabels.addLabelsToContent({
  id: '12345',
  body: [
    { prefix: 'global', name: 'release-notes' },
    { prefix: 'global', name: 'public' },
  ],
});
```

Prefixes: `global` is the ordinary shared label, `my` is personal to you, `team` is team-scoped.

## Read — v2

```ts
const labels = await v2.label.getPageLabels({ id: 12345 });

for (const label of labels.results ?? []) console.log(label.prefix, label.name);
```

Siblings for every container, plus the whole site:

```ts
await v2.label.getBlogPostLabels({ id: 12345 });
await v2.label.getAttachmentLabels({ id: 'att67890' });
await v2.label.getCustomContentLabels({ id: 12345 });
await v2.label.getSpaceLabels({ id: 123456 });        // labels on the space itself
await v2.label.getSpaceContentLabels({ id: 123456 });  // labels on content in the space
await v2.label.getLabels({ limit: 100 });              // every label on the site
```

## Remove — v1

```ts
await v1.contentLabels.removeLabelFromContent({ id: '12345', label: 'release-notes' });
```

There is a second form that takes the name as a query parameter, for names that do not survive a URL path:

```ts
await v1.contentLabels.removeLabelFromContentUsingQueryParameter({ id: '12345', name: 'has/slash' });
```

## Find content by label

The other direction — `labelInfo` is v1-only:

```ts
const details = await v1.labelInfo.getAllLabelContent({ name: 'release-notes' });

for (const content of details.associatedContents?.results ?? []) {
  console.log(content.contentType, content.contentId, content.title);
}
```

::: warning These results are not content objects
Each entry is `{ contentType, contentId, title }` — a **numeric** `contentId`, and no `id`. Every other v1 listing hands back content with a string `id`, so this one catches people out:

```ts
const ids = details.associatedContents?.results?.map(c => String(c.contentId)) ?? [];
```
:::

Narrow it by type, and page it:

```ts
await v1.labelInfo.getAllLabelContent({ name: 'release-notes', type: 'blogpost', limit: 25, start: 0 });
```

Or search for the same thing with CQL, which composes better:

```ts
await v1.search.searchByCQL({ cql: 'type=page and label="release-notes"' });
```

::: tip A label only exists while something carries it
There is no label registry. Ask `getAllLabelContent` for a name nothing uses and you get an `ApiError`, not an empty list — the label genuinely does not exist. The same is true of watching one.
:::

## Space labels

Space labels are a different API again, and they live in `experimental`:

```ts
await v1.experimental.addLabelsToSpace({ spaceKey: 'DOCS', body: [{ prefix: 'global', name: 'product' }] });
const spaceLabels = await v1.experimental.getLabelsForSpace({ spaceKey: 'DOCS', prefix: 'global' });
await v1.experimental.deleteLabelFromSpace({ spaceKey: 'DOCS', name: 'product', prefix: 'global' });
```

`experimental` is Atlassian's own name for that namespace — treat those endpoints as changeable.
