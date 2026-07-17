---
title: Attachments
description: Upload, list, download and replace Confluence attachments with confluence.js — multipart upload via v1, reading via v2.
---

# Attachments

Split down the middle: **v2 reads attachments, v1 uploads them.** v2 has no create endpoint at all, which is one of the clearest reasons v1 still ships.

```ts
import { createV1Client, createV2Client } from 'confluence.js';

const v2 = createV2Client({ host, auth });
const v1 = createV1Client({ host, auth });
```

## Upload

```ts
await v1.contentAttachments.createAttachment({
  id: '12345',
  attachments: { filename: 'report.pdf', content: bytes },
});
```

`content` takes whatever you have:

| Type | Use |
|---|---|
| `string` | text you already have in memory |
| `Buffer` / `Uint8Array` | the usual for a file read into memory |
| `Blob` / `File` | browser input, or `fs.openAsBlob()` |
| `Readable` (Node stream) | a large file you do not want to buffer |
| `ReadableStream` | a `fetch` response body, piped straight through |
| `AsyncIterable<Uint8Array>` | anything else that yields bytes |

```ts
import { readFile } from 'node:fs/promises';

await v1.contentAttachments.createAttachment({
  id: '12345',
  attachments: { filename: 'report.pdf', content: await readFile('report.pdf') },
});
```

Several at once — pass an array:

```ts
const created = await v1.contentAttachments.createAttachment({
  id: '12345',
  attachments: [
    { filename: 'notes.txt', content: 'first' },
    { filename: 'data.csv', content: 'a,b\n1,2' },
  ],
});

console.log(created.results.map(result => result.title));
```

::: tip No FormData, no header
2.x made you build the `FormData` and remember `X-Atlassian-Token: no-check`. Neither is your job now — the call encodes the multipart body and sends the XSRF header itself.
:::

## Upsert

`createAttachment` (POST) adds; `createOrUpdateAttachments` (PUT) adds *or* versions an existing one with the same filename:

```ts
// First call creates it, the second adds a version — same id both times.
const first = await v1.contentAttachments.createOrUpdateAttachments({
  id: '12345',
  attachments: { filename: 'report.pdf', content: v1Bytes },
});

const second = await v1.contentAttachments.createOrUpdateAttachments({
  id: '12345',
  attachments: { filename: 'report.pdf', content: v2Bytes },
});

second.results[0].id === first.results[0].id; // true
```

## Replace the data of one attachment

```ts
await v1.contentAttachments.updateAttachmentData({
  id: '12345',
  attachmentId: 'att67890',
  attachment: { filename: 'report.pdf', content: newBytes },
});
```

## Rename, or edit properties

```ts
const attachment = (await v2.attachment.getAttachmentById({ id: 'att67890' }));

await v1.contentAttachments.updateAttachmentProperties({
  id: '12345',
  attachmentId: 'att67890',
  body: {
    id: 'att67890',
    type: 'attachment',
    title: 'report-final.pdf',
    version: { number: (attachment.version?.number ?? 1) + 1 },
  },
});
```

## List — v2

```ts
const attachments = await v2.attachment.getPageAttachments({ id: 12345 });

for (const attachment of attachments.results ?? []) {
  console.log(attachment.title, attachment.fileSize, attachment.mediaType);
}
```

There are siblings for every container: `getBlogpostAttachments`, `getCustomContentAttachments`, `getLabelAttachments`, and `getAttachments` for the whole site.

## Download

```ts
const bytes = await v1.contentAttachments.downloadAttatchment({
  id: '12345',
  attachmentId: 'att67890',
});

await writeFile('report.pdf', Buffer.from(bytes as Uint8Array));
```

The method name is Atlassian's typo. It is kept because it is the operation id — renaming it in the client would hide which endpoint you are calling.

::: tip
The download is a `302` to a signed URL; `fetch` follows it, so you get the bytes and not the redirect. If you would rather hand the URL to a browser, `v2.attachment.getAttachmentById({ id })` gives you `downloadLink`.
:::

## Delete — v2

```ts
await v2.attachment.deleteAttachment({ id: 'att67890' });
```
