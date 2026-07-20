---
title: Comments
description: Create, read, reply to and resolve Confluence comments with confluence.js — footer comments and inline comments, on pages, blog posts and attachments.
---

# Comments

Comments are v2 territory, end to end. There are two kinds, and they are separate APIs:

- **Footer comments** — the thread at the bottom of a page.
- **Inline comments** — anchored to a selection in the body.

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({ host, auth });

/** Confluence's own storage format — the one the editor round-trips without loss. */
const storage = (html: string) => ({ representation: 'storage' as const, value: html });
```

## Footer comments

```ts
const comment = await confluence.comment.createFooterComment({
  pageId: '12345',
  body: storage('<p>Looks good to me.</p>'),
});
```

Read them back:

```ts
const comments = await confluence.comment.getPageFooterComments({ id: 12345, bodyFormat: 'storage' });

for (const comment of comments.results ?? []) {
  console.log(comment.version?.authorId, comment.body?.storage?.value);
}
```

## Replies

A reply is a footer comment with a `parentCommentId` — passed **instead of** `pageId`, since the parent already says where it lives:

```ts
const reply = await confluence.comment.createFooterComment({
  parentCommentId: comment.id,
  body: storage('<p>Agreed.</p>'),
});

const replies = await confluence.comment.getFooterCommentChildren({ id: Number(comment.id) });
```

## Inline comments

An inline comment has to say what text it is attached to:

```ts
await confluence.comment.createInlineComment({
  pageId: '12345',
  body: storage('<p>Is this still true?</p>'),
  inlineCommentProperties: {
    textSelection: 'ships every Tuesday',
    textSelectionMatchCount: 1,
    textSelectionMatchIndex: 0,
  },
});
```

`textSelection` must appear in the page body verbatim. `textSelectionMatchCount` is how many times it occurs and `textSelectionMatchIndex` which occurrence you mean — Confluence uses the pair to re-anchor the comment as the page changes.

```ts
const inline = await confluence.comment.getPageInlineComments({ id: 12345 });

for (const comment of inline.results ?? []) {
  console.log(comment.resolutionStatus); // 'open' | 'resolved' | 'dangling' | 'reopened'
}
```

`dangling` means the text it pointed at is gone. Filter server-side if you only care about live threads:

```ts
const open = await confluence.comment.getPageInlineComments({ id: 12345, resolutionStatus: ['open'] });
```

## Update

Like pages, an update is a new version, and you say which one you are creating:

```ts
const current = await confluence.comment.getFooterCommentById({ commentId: 67890 });

await confluence.comment.updateFooterComment({
  commentId: 67890,
  body: {
    version: { number: (current.version?.number ?? 1) + 1 },
    body: storage('<p>Edited.</p>'),
  },
});
```

Note the two different `body`s: the outer one is the request payload, the inner one is the comment text.

## Delete

```ts
await confluence.comment.deleteFooterComment({ commentId: 67890 });
await confluence.comment.deleteInlineComment({ commentId: 67891 });
```

::: warning
Deleting a comment is permanent — there is no trash for it, and a read afterwards is a 404.
:::

## Everywhere else comments live

Pages are not the only container:

```ts
await confluence.comment.getBlogPostFooterComments({ id: 12345 });
await confluence.comment.getBlogPostInlineComments({ id: 12345 });
await confluence.comment.getAttachmentComments({ id: 'att67890' });
await confluence.comment.getCustomContentComments({ id: 12345 });

// Or site-wide.
await confluence.comment.getFooterComments({ limit: 50 });
await confluence.comment.getInlineComments({ limit: 50 });
```
