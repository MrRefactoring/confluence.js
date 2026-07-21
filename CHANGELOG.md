# Changelog

## 3.0.3

### Patch Changes

- 6b10499: Restore the npm provenance attestation.

  3.0.2 was published without one: the release switched to `changeset publish`, which delegates to pnpm's native publish,
  and pnpm reads the provenance flag from `.npmrc` rather than the `NPM_CONFIG_PROVENANCE` env var the workflow was
  setting. This release turns provenance on in `.npmrc`, so the published package is signed again — the same SLSA
  attestation 3.0.1 carried. No code changes; the package contents are identical to 3.0.2.

## 3.0.2

### Patch Changes

- 63b6d59: Describe the last fields the schema audit found undocumented.

  Closes the tail left after the previous release: `comment` and `attachment` on a version returned inside a
  `versions` collection, the `count` on a like collection's meta, the hyphenated `inline-marker-ref` /
  `inline-original-selection` inline-comment property keys, the async content-body's `content`, and `noAccessEmails` on
  the check-access-by-email response. The schema audit now reports no drift at all.

  As before, every addition is optional and additive: nothing that used to type-check stops doing so, runtime validation
  is unchanged, and no field is renamed or removed — the types simply describe more of what Confluence already returns.

## 3.0.1

### Patch Changes

- ce62e61: Types now describe the fields Confluence returns that its own spec never documented.

  The schema audit shipped in the previous release found 161 undocumented fields across 93 endpoints — keys the API sends
  at runtime that the published types hid. This release adds 154 of them into the types; the remaining 7 sit behind
  inline or collection schemas and are tracked separately.

  Every addition is optional and additive. Nothing that used to type-check stops doing so, runtime validation is
  unchanged, and no field is renamed or removed — consumers simply gain access in the types to values they were already
  receiving: `_links` keys on every entity, the `Container` and `Version` fields, user `accountStatus`/`locale`, comment
  `resolutionStatus`, and more.

- 01eebdd: Adds a schema audit that reports the keys Confluence sends but the schemas do not describe.

  Nothing changes for callers. Response validation stays loose, so undocumented fields keep passing through untouched,
  and the published types are byte-identical. The audit is off unless `AUDIT_SCHEMAS=true` is set, which only this
  package's own nightly run does; `src/core/schemaAudit.ts` is internal and is not exported.

  The first run found 161 undocumented fields across 93 endpoints — Atlassian's published spec having fallen behind its
  own API rather than anything broken. Each one is a field consumers receive at runtime but cannot see in the types, and
  fixing them is what makes the types truer.

## 3.0.0

### Major Changes

- f219aa3: **confluence.js 3.0 — both Confluence Cloud APIs from one package.**

  The library now covers Cloud REST **v2** (30 namespaces, 218 methods) alongside
  **v1** (28 namespaces, 130 methods). Both are first-class: Atlassian has not
  deprecated v1, and the two cover different ground. One `host` and one client
  serve both — the API path belongs to the request, not to your config.

  Runtime dependencies are down to `zod` alone. axios, form-data, oauth and
  atlassian-jwt are gone with the old transport, which is now the built-in `fetch`.
  Every response is validated against a Zod 4 schema, so API drift raises a
  `SchemaMismatchError` instead of surfacing as `undefined` later on.

  ```ts
  import { createV2Client } from 'confluence.js';

  const confluence = createV2Client({
    host: 'https://your-domain.atlassian.net',
    auth: { type: 'basic', email, apiToken },
  });

  await confluence.page.getPages({ spaceId: ['123'] });
  ```

  Or import just what you call — the package is ESM-only and tree-shakable, with
  entry points at `confluence.js/v1`, `confluence.js/v2` and `confluence.js/core`.

  **OAuth 2.0 (3LO)** is a first-class strategy. Hand over your app credentials and
  a refresh token, and the client refreshes before expiry, retries once on a `401`,
  resolves the cloud id, and routes through the Atlassian gateway — where 3LO tokens
  are actually accepted:

  ```ts
  const confluence = createV2Client({
    auth: {
      type: 'oauth2',
      clientId,
      clientSecret,
      refreshToken,
      onTokenRefresh: ({ refreshToken }) => tokenStore.save(refreshToken),
    },
  });
  ```

  The flow itself is covered too, so no separate OAuth library is needed:
  `generateAuthorizationUrl`, `parseCallbackUrl`, `exchangeAuthorizationCode`,
  `refreshOAuth2Token` and `getAccessibleResources`.

  Both version factories accept an existing client, so v1 and v2 can share one
  OAuth token — building one each would make the first refresh invalidate the
  other's rotating refresh token:

  ```ts
  const client = createClient({ auth: { type: 'oauth2', … } });

  const v1 = createV1Client(client);
  const v2 = createV2Client(client);
  ```

  **Node and the browser, from one build.** There is no separate web build: the code
  branches on what the runtime supports rather than on which runtime it is. It loads
  from a dependency-resolving CDN as published, and a self-contained `dist/browser.js`
  with zod inlined covers plain file hosts and `<script type="module">`:

  ```html
  <script type="module">
    import { createV2Client } from 'https://esm.sh/confluence.js';
  </script>
  ```

  Attachments accept the same values everywhere — a `File`, `Blob`, `Uint8Array`,
  string, stream, and still Node's `Buffer` and `Readable`, which are a `Uint8Array`
  and an `AsyncIterable` respectively. They are no longer _named_ in `AttachmentContent`,
  so the shipped declarations compile in a project without `@types/node`. Where a
  browser cannot send a request body as a stream, the stream is read into a `Blob`
  rather than failing. See the [browser guide](https://mrrefactoring.github.io/confluence.js/guide/browser).

  **Every failure has a type.** Non-2xx responses throw an `ApiError` subclass —
  `AuthError`, `ForbiddenError`, `NotFoundError`, `RateLimitError` (with
  `retryAfterMs` parsed from `Retry-After`), `ServerError`. Transport faults throw
  `NetworkError` instead of leaking a raw `fetch` `TypeError`, and OAuth failures
  throw `OAuthError`. A 2xx whose body does not match the schema throws
  `SchemaMismatchError`, carrying the raw `body` and, when the shape drifted, the
  underlying `ZodError` on `cause`. Each ships an `isXxx` predicate that checks a branded marker
  rather than the prototype chain, so narrowing survives two copies of the package
  in one `node_modules`:

  ```ts
  import { isNotFoundError, isRateLimitError } from 'confluence.js';

  if (isNotFoundError(error)) return null;
  if (isRateLimitError(error)) await sleep(error.retryAfterMs ?? 60_000);
  ```

  ### Breaking changes
  - `new ConfluenceClient({…})` → `createV1Client({…})` / `createV2Client({…})`
  - `authentication: { basic: {…} }` → `auth: { type: 'basic', … }`; `oauth2` → `auth: { type: 'oauth2', … }`
  - JWT (Atlassian Connect) authentication is not supported — Connect apps should stay on `confluence.js@2`
  - Callbacks, `middlewares`, `apiPrefix` and `baseRequestConfig` are removed
  - `noCheckAtlassianToken` is removed with nothing to replace it: v1 enforces XSRF
    on every write, so every v1 write now sends `X-Atlassian-Token: no-check` itself
  - `BaseClient` and the per-namespace classes are gone, as are deep imports like `confluence.js/api/content`
  - Errors are `ApiError` and its subclasses (`status`, `statusText`, `body`) rather
    than `AxiosError`; transport faults are `NetworkError`, OAuth failures are `OAuthError`
  - `AttachmentContent` no longer names `Buffer` or `Readable`. Both still work — the
    type describes them structurally — but a declaration that required `@types/node`
    broke every browser consumer
  - `createMultipartRequestBody` returns a `Promise`: collecting a stream for a runtime
    that cannot send one is asynchronous
  - The v1 surface follows Atlassian's current spec, which has dropped 37 operations
    (`getContent`, `createContent`, `getSpace`, …) since 2.x shipped — each is mapped
    to its v2 equivalent in the migration guide

  See [MIGRATION.md](https://github.com/MrRefactoring/confluence.js/blob/master/MIGRATION.md);
  a codemod handles the mechanical parts.

## [2.1.0] - 2025-07-17

### **Deprecations** ⚠️

- **Package dependencies**:
  - Replaced deprecated `atlassian-jwt` with `@atlassian/atlassian-jwt`.
- **Content APIs**:
  - Deprecated all content-related methods due to [Confluence API changes](https://developer.atlassian.com/cloud/confluence/changelog/#CHANGE-2520):
    - `content.getContent`, `content.createContent`, `content.getContentById`, `content.updateContent`, `content.deleteContent`
    - `content.getHistoryForContent`, `contentAttachments.getAttachments`, `contentBody.convertContentBody`
    - `contentChildrenAndDescendants.getContentChildren`, `contentChildrenAndDescendants.getContentChildrenByType`
    - `ContentComments`, `contentLabels.getLabelsForContent`, `ContentProperties`
    - `contentVersions.getContentVersions`, `contentVersions.getContentVersion`
- **Group APIs**:
  - Deprecated group-related methods:
    - `group.removeGroup`, `group.getGroupByQueryParam`, `group.getGroupByName`
    - `group.getMembersByQueryParam`, `group.getGroupMembers`
- **Other APIs**:
  - Deprecated `InlineTasks`, `SpaceProperties`, `users.getBulkUserMigration`
  - Deprecated content restriction methods:
    - `contentRestrictions.getContentRestrictionStatusForGroup`
    - `contentRestrictions.addGroupToContentRestriction`
    - `contentRestrictions.removeGroupByName`
  - Deprecated `settings.setLookAndFeelSettings`
  - Deprecated space-related methods:
    - `space.getSpaces`, `space.getSpace`, `space.getContentForSpace`, `space.getContentByTypeForSpace`

### **New Features** ✨

- **New endpoints**:
  - Added `contentBody.bulkAsyncConvertContentBodyResponse` and `contentBody.bulkAsyncConvertContentBodyRequest`
  - Added `contentStates.getContentsWithState` method
  - Introduced new `UserProperties` API
- **API improvements**:
  - Added `status` property to `contentAttachments.downloadAttachment`
  - Added `key` property to `longRunningTask.getTasks`
  - Added `sitePermissionTypeFilter` property to `search.searchUser`
  - Added `alias` property to both `space.createSpace` and `space.createPrivateSpace`
  - #145 Added `start` and `limit` properties to `contentChildrenAndDescendants.getContentChildren`. Thanks to @javierbrea for requesting this feature.

### **API Changes** 🔄

- **Experimental methods moved**:
  - Moved experimental user property methods to `userProperties` namespace:
    - `getUserProperties`, `getUserProperty`, `createUserProperty`, `updateUserProperty`, `deleteUserProperty`
- **Parameter fixes**:
  - Simplified `group.removeGroupById` parameters (no longer requires `operationKey` and `groupId`)

### **Other Changes**

- **Package structure**:
  - Reordered `exports` in `package.json` for better module resolution

---

## [2.0.0] - 2025-05-09

### **Breaking Changes** ⚠️

- **Deprecated APIs removed**: APIs marked as deprecated in v1.x have been removed.
- **Server API removed**: Server-related code and support are no longer included.
- **Node.js version**: Minimum supported version is now **Node 20**.
  - Upgrade your environment if using Node < 20.

### **Major Improvements** ✨

- **Dual CJS/ESM support**: Added ESM (ECMAScript Modules) support **alongside** existing CommonJS.
  - Use `import` (ESM) or `require` (CJS) — both work.
  - ESM entry point: `dist/esm/index.js` (via `"module"` field in `package.json`).
- **Testing**: Replaced `ava` with [`vitest`](https://vitest.dev/) for faster, modern testing.
- **Security**: Fixed JWT expiry time handling.
  - Tokens now respect configured TTL consistently.

### **Other Changes**

- **Telemetry**: All telemetry/tracking code has been removed.
  - No data is collected by the package.

## [1.7.3] - 2024-03-04

- Dependencies updated
- Expand properties added for few endpoints

## [1.7.2] - 2023-12-01

Changes in this version:

- Implemented automatic GitHub release and tag creation in the CI pipeline. This enhancement, addressed in issue [#133](https://github.com/MrRefactoring/confluence.js/issues/133), automates the process of creating GitHub releases and tags corresponding to new versions, streamlining the release process.
- Thanks to [Joe Ennever](https://github.com/JoeEnnever), the `searchContentByCQL` method has been enhanced with an `expand` property. This addition, merged in pull request [#134](https://github.com/MrRefactoring/confluence.js/pull/134/files), allows for more flexible and detailed content queries in the Confluence API.

### 1.7.0

- `apiPrefix` was added to the code for allowing to use of custom API prefix for all clients. Thanks to [Petr Plenkov](https://github.com/ThePlenkov) for the pull request.

### 1.6.3

- `atlas_doc_format` added to some models. Thanks to [Andrew McClenaghan](https://github.com/andymac4182) for pull request.

### 1.6.2

- Badge fixed
- Dependencies updated

### 1.6.1

`AuthenticationService` added to export facade. Thanks to [Andrew McClenaghan](https://github.com/andymac4182) for this improvement.

### 1.6.0

Cloud API:

- `asyncConvertContentBodyRequest` method added to `ContentBody` API.
- `asyncConvertContentBodyResponse` method added to `ContentBody` API.
- [`ContentContentState`](https://github.com/MrRefactoring/confluence.js/blob/master/src/api/contentContentState.ts) API are deprecated. Use [`ContentStates`](https://github.com/MrRefactoring/confluence.js/blob/master/src/api/contentStates.ts) instead.
- `getAndConvertMacroBodyByMacroId` method added to `ContentMacroBody` API.
- `getAndAsyncConvertMacroBodyByMacroId` method added to `ContentMacroBody` API.
- `registerModules` method fixed via adding body to the request. `DynamicModules` API.
- Other fixes and improvements. (like `expand` property adding).

### 1.5.3

`expand` property added to `convertContentBody` method to `ContentBody` API. Thanks to [Federico Gonzalez](https://github.com/FedeG) for report.

### 1.5.2

`multipart/form-data` added to some required endpoints. Thank you, [Gonzalo Garcia](https://github.com/ggarcia24) for reporting issue and creating PR :)

### 1.5.1

Dependencies updated

### 1.5.0

`ContentAttachments` fixes for all attachments. ([#23](https://github.com/MrRefactoring/confluence.js/issues/23) Thanks to [Anton](https://github.com/tester22) for catching)

### 1.4.1

- Dependencies updated.

### 1.4.0

- Analytics API added.
- ContentContentState API added.
- `deletePageTree` method added to `Experimental`.
- `getUserProperties` method added to `Experimental`.
- `getUserProperty` method added to `Experimental`.
- `createUserProperty` method added to `Experimental`.
- `updateUserProperty` method added to `Experimental`.
- `deleteUserProperty` method added to `Experimental`.
- `getContentStateSettings` method added to `Settings`.
- Another small changes.
- Personal Access token authentication added.

### 1.3.0

- Telemetry removed (deprecated)
- Fixed bug with spaceKeys in `client.space.getSpaces` ([#14](https://github.com/MrRefactoring/confluence.js/issues/14) Thanks to [David Sanchez](https://github.com/emulienfou) for catching)
- Fixed bug with attachment download ([#15](https://github.com/MrRefactoring/confluence.js/issues/15) Thanks to [Martin Reinhardt](https://github.com/hypery2k) for catching)

### 1.2.2

- JSDOC improvements
- New experimental endpoints
- Small improvements

### 1.2.1

- Vulnerabilities fixes.
- Dependencies updated.
- Docs updated
- `expand` property added to `getContentById` method.

### 1.2.0

- Cloud API
  - `archivePages` method added to `Content`.
  - `publishLegacyDraft` request fixed in `Content` class.
  - `publishSharedDraft` request fixed in `Content` class.
  - `downloadAttachment` method added to `ContentAttachments`.
  - `descendantsOfType` renamed to `getDescendantsOfType` in `ContentChildrenAndDescendants`.
  - `permissionCheck` renamed to `checkContentPermission` in `ContentPermissions`.
  - `key` property added to `getContentProperties` request in `ContentProperties`.
  - Added `Experemental` API.
  - `accessType` property added to `getGroups` request in `Group`.
  - `removeGroupById` method added to `Group`.
  - `getGroup` renamed to `getGroupByName` in `Group`.
  - `getGroupsSearch` renamed to `searchGroups` in `Group`.
  - `accountId` property added to `addUserToGroupByGroupId` in `Group`.
  - `accountId` property added to `addUserToGroup` in `Group`.
  - `getTaskById` method added to `InlineTasks`.
  - `updateTaskById` method added to `InlineTasks`.
  - `GetRelationship` renamed to `getRelationship` in `Relation`.
  - `delete` renamed to `deleteRelationship` in `Relation`.
  - `search` renamed to `searchByCQL` in `Search`.
  - `userSearch` renamed to `searchUser` in `Search`.
  - `horizontalHeader`, `spaceReference`, `links` properties added to `updateLookAndFeelSettings` in `Settings`.
  - `permissions` property added to `createPrivateSpace` in `Space`.
  - `type` and `status` properties added to `updateSpace` in `Space`.
  - `addPermission` renamed to `addPermissionToSpace` in `SpacePermissions`.
  - `addCustomContentPermissions` method added to `SpacePermissions`.
  - `space` property added to `createSpaceProperty` in `SpaceProperties`.

### 1.1.3

- Vulnerabilities fixed
- Small params fixes in content creating

### 1.1.2

- `expand` property added to `Content.getContent` request.
- `expand` property added to `Content.createContent` request.
- `Content.updateContent` request body fixed. ([#6](https://github.com/MrRefactoring/confluence.js/issues/6) Thanks [eddiegroves](https://github.com/eddiegroves) for catching)

### 1.1.1

- `expand` property added to `ContentAttachments.getAttachments`. ([#4](https://github.com/MrRefactoring/confluence.js/issues/4) Thanks [eddiegroves](https://github.com/eddiegroves) for catching)

### 1.1.0

- Server API added

### 1.0.1

- Minor internal improvements
- New endpoint added

### 1.0.0

- Initial upload
