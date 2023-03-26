# Changelog

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
