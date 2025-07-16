# Changelog

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
