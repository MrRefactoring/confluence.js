---
title: Миграция с 2.x на 3.0
description: Что изменилось в confluence.js 3.0 — фабрики вместо классов, fetch вместо axios, обе версии API в одном пакете и codemod, делающий механическую часть.
---

# Миграция с 2.x на 3.0

3.0 переделывает публичную поверхность. Эта страница — карта; [полное руководство в репозитории](https://github.com/MrRefactoring/confluence.js/blob/master/MIGRATION.md) содержит все детали, а механическую часть делает codemod:

```bash
npx jscodeshift -t node_modules/confluence.js/tools/codemod/v2-to-v3.ts \
  --parser ts --extensions ts,tsx,js,jsx src/
```

Он переписывает то, что может, и оставляет комментарий `TODO(confluence.js@3)` везде, где решение должен принять человек.

## Клиент

```diff
-import { ConfluenceClient } from 'confluence.js';
-
-const client = new ConfluenceClient({
-  host: 'https://your-domain.atlassian.net',
-  authentication: { basic: { email, apiToken } },
-});
+import { createV1Client } from 'confluence.js';
+
+const client = createV1Client({
+  host: 'https://your-domain.atlassian.net',
+  auth: { type: 'basic', email, apiToken },
+});
```

`ConfluenceClient` был API v1, поэтому `createV1Client` — замена один в один. Новое в 3.0: `createV2Client` даёт API v2 — 30 неймспейсов, 218 методов — из того же пакета и с тем же host. См. [Выбор версии](../guide/choosing-a-version).

## Конфигурация

| 2.x | 3.0 |
|---|---|
| `authentication: { basic: { email, apiToken } }` | `auth: { type: 'basic', email, apiToken }` |
| `authentication: { oauth2: { accessToken } }` | `auth: { type: 'bearer', token }` |
| `authentication: { jwt: … }` | *удалено* — Connect-приложения остаются на 2.x |
| `apiPrefix` | *удалено* — путь к API теперь часть запроса |
| `baseRequestConfig` | *удалено* — это был конфиг axios, а транспорт теперь `fetch` |
| `middlewares: { onError, onResponse }` | *удалено* — используйте `try`/`catch` |
| `noCheckAtlassianToken: true` | *удалено* — v1 теперь всегда шлёт заголовок сам |
| — | `retry` — включаемые повторы транспортных сбоев |
| — | `getAuthOn401` — переполучение авторизации после 401 |

### `noCheckAtlassianToken` удалён, и заменять его нечем

v1 включает XSRF-защиту на каждой записи: без `X-Atlassian-Token: no-check` любая отвечает `403 XSRF check failed`. В 2.x это надо было включать самому, и забытый флаг был типичным первым 403. Теперь каждая сгенерированная запись v1 шлёт заголовок сама — настраивать больше нечего.

## Колбэки убраны

Каждый метод возвращал промис *и* принимал колбэк. В 3.0 только промисы:

```diff
-client.group.getGroups({}, (error, data) => {
-  if (error) return handle(error);
-  use(data);
-});
+try {
+  use(await client.group.getGroups({}));
+} catch (error) {
+  handle(error);
+}
```

## Ошибки

```diff
-catch (error) {
-  if (error.response?.status === 404) { /* … */ }
-}
+catch (error) {
+  if (error instanceof ApiError && error.status === 404) { /* … */ }
+}
```

Новое в 3.0: ответ, не совпавший со схемой, бросает `ZodError`. См. [Обработку ошибок](../guide/error-handling).

## Импорты

```diff
-import { ConfluenceClient, Config } from 'confluence.js';
-import { Content } from 'confluence.js/api/content';
+import { createV1Client, type ClientConfig } from 'confluence.js';
+import { getGroups } from 'confluence.js/v1';
+import { getPages } from 'confluence.js/v2';
+import { createClient } from 'confluence.js/core';
```

`BaseClient` и классы по неймспейсам убраны, как и глубокие импорты вида `confluence.js/api/content`.

## Surface v1 следует текущей спеке Atlassian

Это изменение с наибольшей вероятностью затронет ваш код, и выбрали его не мы.

`confluence.js` генерирует клиент из опубликованной OpenAPI-спеки Atlassian, а **Atlassian убрал из спеки v1 37 операций** с момента выхода 2.x — включая `getContent`, `createContent` и `getSpace`, — потому что их покрывает v2. По той же причине их нет в v1 в 3.0.

Почти у всех есть эквивалент в v2:

| 2.x | 3.0 — `createV2Client()` |
|---|---|
| `content.getContent` | `page.getPages` / `blogPost.getBlogPosts` / `customContent.getCustomContent` |
| `content.getContentById` | `page.getPageById` / `blogPost.getBlogPostById` |
| `content.createContent` | `page.createPage` / `blogPost.createBlogPost` |
| `content.updateContent` | `page.updatePage` / `blogPost.updateBlogPost` |
| `content.deleteContent` | `page.deletePage` / `blogPost.deleteBlogPost` |
| `contentChildrenAndDescendants.getContentChildren` | `children.getPageChildren` / `descendants.getPageDescendants` |
| `contentComments.getContentComments` | `comment.getPageFooterComments` / `comment.getPageInlineComments` |
| `contentAttachments.getAttachments` | `attachment.getPageAttachments` |
| `contentVersions.getContentVersions` | `version.getPageVersions` |
| `contentLabels.getLabelsForContent` | `label.getPageLabels` |
| `contentProperties.*` | `contentProperties.getPageContentProperties` и соседи |
| `space.getSpace`, `space.getSpaces` | `space.getSpaceById` / `space.getSpaces` |
| `spaceProperties.*` | `spaceProperties.getSpaceProperties` и соседи |
| `inlineTasks.*` | `task.getTasks` / `task.getTaskById` |

У трёх замены здесь нет: `contentBody.convertContentBody` (оставайтесь на 2.x) и `group.addUserToGroup` / `group.removeMemberFromGroup` (управление пользователями переехало в [Admin API](https://developer.atlassian.com/cloud/admin/user-management/rest/)).

Одна операция не уехала в v2 вовсе — она осталась в v1 под новым именем: `contentAttachments.createAttachments` теперь `contentAttachments.createAttachment`, и ей больше не нужен собранный вручную `FormData`. См. [Вложения](../recipes/attachments).

## Загрузка вложений стала проще

```diff
-await client.contentAttachments.createAttachments({
-  id: pageId,
-  attachment: { file: fs.createReadStream('report.pdf') },
-});
+await confluence.contentAttachments.createAttachment({
+  id: pageId,
+  attachments: { filename: 'report.pdf', content: bytes },
+});
```

## Остаётесь на 2.x?

2.x продолжает работать. Оставайтесь там, если нужен **JWT / Atlassian Connect** или `convertContentBody`. Больше ничего в 3.0 не требует переписывания, которое codemod не может начать за вас.
