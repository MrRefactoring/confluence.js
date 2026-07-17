---
title: Комментарии
description: Создание, чтение, ответы и разрешение комментариев Confluence через confluence.js — footer- и inline-комментарии на страницах, блог-постах и вложениях.
---

# Комментарии

Комментарии целиком на территории v2. Их два вида, и это разные API:

- **Footer-комментарии** — обсуждение под страницей.
- **Inline-комментарии** — привязаны к выделению в тексте.

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({ host, auth });

/** Собственный формат Confluence — тот, который редактор гоняет без потерь. */
const storage = (html: string) => ({ representation: 'storage' as const, value: html });
```

## Footer-комментарии

```ts
const comment = await confluence.comment.createFooterComment({
  pageId: '12345',
  body: storage('<p>Выглядит хорошо.</p>'),
});
```

Чтение:

```ts
const comments = await confluence.comment.getPageFooterComments({ id: 12345, bodyFormat: 'storage' });

for (const comment of comments.results ?? []) {
  console.log(comment.version?.authorId, comment.body?.storage?.value);
}
```

## Ответы

Ответ — это footer-комментарий с `parentCommentId`, который передаётся **вместо** `pageId`: родитель и так определяет, где комментарий живёт.

```ts
const reply = await confluence.comment.createFooterComment({
  parentCommentId: comment.id,
  body: storage('<p>Согласен.</p>'),
});

const replies = await confluence.comment.getFooterCommentChildren({ id: Number(comment.id) });
```

## Inline-комментарии

Inline-комментарий обязан сказать, к какому тексту он привязан:

```ts
await confluence.comment.createInlineComment({
  pageId: '12345',
  body: storage('<p>Это всё ещё актуально?</p>'),
  inlineCommentProperties: {
    textSelection: 'выкатываем по вторникам',
    textSelectionMatchCount: 1,
    textSelectionMatchIndex: 0,
  },
});
```

`textSelection` должен встречаться в теле страницы дословно. `textSelectionMatchCount` — сколько раз он встречается, `textSelectionMatchIndex` — какое именно вхождение вы имеете в виду; по этой паре Confluence перепривязывает комментарий при изменении страницы.

```ts
const inline = await confluence.comment.getPageInlineComments({ id: 12345 });

for (const comment of inline.results ?? []) {
  console.log(comment.resolutionStatus); // 'open' | 'resolved' | 'dangling' | 'reopened'
}
```

`dangling` означает, что текста, на который он указывал, больше нет. Фильтровать лучше на сервере:

```ts
const open = await confluence.comment.getPageInlineComments({ id: 12345, resolutionStatus: ['open'] });
```

## Обновление

Как и у страниц, обновление — это новая версия, и вы говорите, какую создаёте:

```ts
const current = await confluence.comment.getFooterCommentById({ commentId: 67890 });

await confluence.comment.updateFooterComment({
  commentId: 67890,
  body: {
    version: { number: (current.version?.number ?? 1) + 1 },
    body: storage('<p>Отредактировано.</p>'),
  },
});
```

Обратите внимание на два разных `body`: внешний — это тело запроса, внутренний — текст комментария.

## Удаление

```ts
await confluence.comment.deleteFooterComment({ commentId: 67890 });
await confluence.comment.deleteInlineComment({ commentId: 67891 });
```

::: warning
Удаление комментария необратимо — корзины для него нет, и следующее чтение вернёт 404.
:::

## Где ещё живут комментарии

Страницы — не единственный контейнер:

```ts
await confluence.comment.getBlogPostFooterComments({ id: 12345 });
await confluence.comment.getBlogPostInlineComments({ id: 12345 });
await confluence.comment.getAttachmentComments({ id: 'att67890' });
await confluence.comment.getCustomContentComments({ id: 12345 });

// Или по всему сайту.
await confluence.comment.getFooterComments({ limit: 50 });
await confluence.comment.getInlineComments({ limit: 50 });
```
