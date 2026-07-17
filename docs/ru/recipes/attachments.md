---
title: Вложения
description: Загрузка, чтение, скачивание и замена вложений Confluence через confluence.js — multipart-загрузка в v1, чтение через v2.
---

# Вложения

Разделено пополам: **v2 читает вложения, v1 их загружает.** В v2 нет эндпоинта создания вообще — это одна из самых наглядных причин, по которым v1 всё ещё поставляется.

```ts
import { createV1Client, createV2Client } from 'confluence.js';

const v2 = createV2Client({ host, auth });
const v1 = createV1Client({ host, auth });
```

## Загрузка

```ts
await v1.contentAttachments.createAttachment({
  id: '12345',
  attachments: { filename: 'report.pdf', content: bytes },
});
```

`content` принимает то, что у вас есть:

| Тип | Когда |
|---|---|
| `string` | текст, уже лежащий в памяти |
| `Buffer` / `Uint8Array` | обычный случай для файла, прочитанного в память |
| `Blob` / `File` | ввод из браузера или `fs.openAsBlob()` |
| `Readable` (поток Node) | большой файл, который не хочется буферизовать |
| `ReadableStream` | тело ответа `fetch`, проброшенное напрямую |
| `AsyncIterable<Uint8Array>` | всё остальное, что отдаёт байты |

```ts
import { readFile } from 'node:fs/promises';

await v1.contentAttachments.createAttachment({
  id: '12345',
  attachments: { filename: 'report.pdf', content: await readFile('report.pdf') },
});
```

Несколько сразу — передайте массив:

```ts
const created = await v1.contentAttachments.createAttachment({
  id: '12345',
  attachments: [
    { filename: 'notes.txt', content: 'первый' },
    { filename: 'data.csv', content: 'a,b\n1,2' },
  ],
});

console.log(created.results.map(result => result.title));
```

::: tip Ни FormData, ни заголовка
В 2.x приходилось собирать `FormData` вручную и помнить про `X-Atlassian-Token: no-check`. Теперь ни то ни другое не ваша забота: вызов сам кодирует multipart-тело и сам шлёт XSRF-заголовок.
:::

## Создать или обновить

`createAttachment` (POST) добавляет; `createOrUpdateAttachments` (PUT) добавляет **или** создаёт новую версию существующего с тем же именем файла:

```ts
// Первый вызов создаёт, второй добавляет версию — id в обоих случаях один.
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

## Замена содержимого одного вложения

```ts
await v1.contentAttachments.updateAttachmentData({
  id: '12345',
  attachmentId: 'att67890',
  attachment: { filename: 'report.pdf', content: newBytes },
});
```

## Переименование и свойства

```ts
const attachment = await v2.attachment.getAttachmentById({ id: 'att67890' });

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

## Список — v2

```ts
const attachments = await v2.attachment.getPageAttachments({ id: 12345 });

for (const attachment of attachments.results ?? []) {
  console.log(attachment.title, attachment.fileSize, attachment.mediaType);
}
```

Есть аналоги для каждого контейнера: `getBlogpostAttachments`, `getCustomContentAttachments`, `getLabelAttachments` и `getAttachments` для всего сайта.

## Скачивание

```ts
const bytes = await v1.contentAttachments.downloadAttatchment({
  id: '12345',
  attachmentId: 'att67890',
});

await writeFile('report.pdf', Buffer.from(bytes as Uint8Array));
```

Опечатка в названии — от Atlassian. Она сохранена, потому что это operationId: переименование в клиенте скрыло бы, какой эндпоинт вы вызываете.

::: tip
Скачивание — это `302` на подписанный URL; `fetch` следует за ним, поэтому вы получаете байты, а не редирект. Если URL нужен, чтобы отдать его браузеру, `v2.attachment.getAttachmentById({ id })` вернёт `downloadLink`.
:::

## Удаление — v2

```ts
await v2.attachment.deleteAttachment({ id: 'att67890' });
```
