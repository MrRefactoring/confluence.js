import { type ClientConfig, type Client, type RequestOptions, createClient, type Buffer } from '#/core';
import * as audit from './api/audit';
import * as content from './api/content';
import * as experimental from './api/experimental';
import * as contentChildrenAndDescendants from './api/contentChildrenAndDescendants';
import * as contentAttachments from './api/contentAttachments';
import * as contentMacroBody from './api/contentMacroBody';
import * as contentLabels from './api/contentLabels';
import * as contentWatches from './api/contentWatches';
import * as contentPermissions from './api/contentPermissions';
import * as contentRestrictions from './api/contentRestrictions';
import * as contentStates from './api/contentStates';
import * as contentVersions from './api/contentVersions';
import * as contentBody from './api/contentBody';
import * as labelInfo from './api/labelInfo';
import * as group from './api/group';
import * as longRunningTask from './api/longRunningTask';
import * as relation from './api/relation';
import * as search from './api/search';
import * as settings from './api/settings';
import * as themes from './api/themes';
import * as space from './api/space';
import * as spacePermissions from './api/spacePermissions';
import * as spaceSettings from './api/spaceSettings';
import * as template from './api/template';
import * as users from './api/users';
import * as dynamicModules from './api/dynamicModules';
import * as analytics from './api/analytics';
import * as userProperties from './api/userProperties';
import type {
  GetAuditRecords,
  CreateAuditRecord,
  ExportAuditRecords,
  SetRetentionPeriod,
  GetAuditRecordsForTimePeriod,
  ArchivePages,
  PublishLegacyDraft,
  PublishSharedDraft,
  SearchContentByCQL,
  DeletePageTree,
  GetLabelsForSpace,
  AddLabelsToSpace,
  DeleteLabelFromSpace,
  MovePage,
  GetContentDescendants,
  GetDescendantsOfType,
  CopyPageHierarchy,
  CopyPage,
  CreateAttachment,
  CreateOrUpdateAttachments,
  UpdateAttachmentProperties,
  UpdateAttachmentData,
  DownloadAttatchment,
  GetMacroBodyByMacroId,
  GetAndConvertMacroBodyByMacroId,
  GetAndAsyncConvertMacroBodyByMacroId,
  AddLabelsToContent,
  RemoveLabelFromContentUsingQueryParameter,
  RemoveLabelFromContent,
  GetWatchesForPage,
  GetWatchesForSpace,
  GetWatchersForSpace,
  GetContentWatchStatus,
  AddContentWatcher,
  RemoveContentWatcher,
  IsWatchingLabel,
  AddLabelWatcher,
  RemoveLabelWatcher,
  IsWatchingSpace,
  AddSpaceWatcher,
  RemoveSpaceWatch,
  CheckContentPermission,
  GetRestrictions,
  AddRestrictions,
  UpdateRestrictions,
  DeleteRestrictions,
  GetRestrictionsByOperation,
  GetRestrictionsForOperation,
  GetIndividualGroupRestrictionStatusByGroupId,
  AddGroupToContentRestrictionByGroupId,
  RemoveGroupFromContentRestriction,
  GetContentRestrictionStatusForUser,
  AddUserToContentRestriction,
  RemoveUserFromContentRestriction,
  GetContentState,
  SetContentState,
  RemoveContentState,
  GetAvailableContentStates,
  GetSpaceContentStates,
  GetContentStateSettings,
  GetContentsWithState,
  RestoreContentVersion,
  DeleteContentVersion,
  AsyncConvertContentBodyRequest,
  AsyncConvertContentBodyResponse,
  BulkAsyncConvertContentBodyResponse,
  BulkAsyncConvertContentBodyRequest,
  GetAllLabelContent,
  GetGroups,
  CreateGroup,
  GetGroupByGroupId,
  RemoveGroupById,
  SearchGroups,
  GetGroupMembersByGroupId,
  AddUserToGroupByGroupId,
  RemoveMemberFromGroupByGroupId,
  GetTasks,
  GetTask,
  FindTargetFromSource,
  GetRelationship,
  CreateRelationship,
  DeleteRelationship,
  FindSourcesForTarget,
  SearchByCQL,
  SearchUser,
  GetLookAndFeelSettings,
  UpdateLookAndFeel,
  UpdateLookAndFeelSettings,
  ResetLookAndFeelSettings,
  GetThemes,
  GetTheme,
  GetSpaceTheme,
  SetSpaceTheme,
  ResetSpaceTheme,
  CreateSpace,
  CreatePrivateSpace,
  UpdateSpace,
  DeleteSpace,
  AddPermissionToSpace,
  AddCustomContentPermissions,
  RemovePermission,
  GetSpaceSettings,
  UpdateSpaceSettings,
  CreateContentTemplate,
  UpdateContentTemplate,
  GetBlueprintTemplates,
  GetContentTemplates,
  GetContentTemplate,
  RemoveTemplate,
  GetUser,
  GetAnonymousUser,
  GetCurrentUser,
  GetGroupMembershipsForUser,
  GetBulkUserLookup,
  GetPrivacyUnsafeUserEmail,
  GetPrivacyUnsafeUserEmailBulk,
  RegisterModules,
  RemoveModules,
  GetViews,
  GetViewers,
  GetUserProperties,
  GetUserProperty,
  CreateUserProperty,
  UpdateUserProperty,
  DeleteUserProperty,
} from './parameters';
import type {
  AuditRecordArray,
  AuditRecord,
  RetentionPeriod,
  LongTask,
  Content,
  ContentArray,
  LabelArray,
  MovePage as MovePageModel,
  ContentChildren,
  MacroInstance,
  ContentBody,
  AsyncId,
  WatchArray,
  SpaceWatchArray,
  UserWatch,
  PermissionCheckResponse,
  ContentRestrictionArray,
  GetRestrictionsByOperation as GetRestrictionsByOperationModel,
  ContentRestriction,
  ContentStateResponse,
  AvailableContentStates,
  ContentState,
  ContentStateSettings,
  Version,
  AsyncContentBody,
  AsyncContentBodyArray,
  AsyncIdArray,
  LabelDetails,
  GroupArrayWithLinks,
  Group,
  UserArray,
  LongTaskStatusArray,
  LongTaskStatusWithLinks,
  RelationArray,
  Relation,
  SearchPageResponseSearchResult,
  LookAndFeelSettings,
  LookAndFeelSelection,
  LookAndFeelWithLinks,
  SystemInfoEntity,
  ThemeArray,
  Theme,
  Space,
  SpacePermissionV2,
  SpaceSettings,
  ContentTemplate,
  BlueprintTemplateArray,
  ContentTemplateArray,
  User,
  UserAnonymous,
  BulkUserLookupArray,
  AccountIdEmailRecord,
  AccountIdEmailRecordArray,
  GetViews as GetViewsModel,
  GetViewers as GetViewersModel,
  UserPropertyKeyArray,
  UserProperty,
} from './models';

export function createV1Client(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);

  return {
    audit: {
      getAuditRecords: (parameters?: GetAuditRecords, options?: RequestOptions): Promise<AuditRecordArray> =>
        audit.getAuditRecords(client, parameters, options),
      createAuditRecord: (parameters: CreateAuditRecord, options?: RequestOptions): Promise<AuditRecord> =>
        audit.createAuditRecord(client, parameters, options),
      exportAuditRecords: (parameters?: ExportAuditRecords, options?: RequestOptions): Promise<Buffer> =>
        audit.exportAuditRecords(client, parameters, options),
      getRetentionPeriod: (options?: RequestOptions): Promise<RetentionPeriod> =>
        audit.getRetentionPeriod(client, options),
      setRetentionPeriod: (parameters: SetRetentionPeriod, options?: RequestOptions): Promise<RetentionPeriod> =>
        audit.setRetentionPeriod(client, parameters, options),
      getAuditRecordsForTimePeriod: (
        parameters?: GetAuditRecordsForTimePeriod,
        options?: RequestOptions,
      ): Promise<AuditRecordArray> => audit.getAuditRecordsForTimePeriod(client, parameters, options),
    },
    content: {
      archivePages: (parameters: ArchivePages, options?: RequestOptions): Promise<LongTask> =>
        content.archivePages(client, parameters, options),
      publishLegacyDraft: (parameters: PublishLegacyDraft, options?: RequestOptions): Promise<Content> =>
        content.publishLegacyDraft(client, parameters, options),
      publishSharedDraft: (parameters: PublishSharedDraft, options?: RequestOptions): Promise<Content> =>
        content.publishSharedDraft(client, parameters, options),
      searchContentByCQL: (parameters: SearchContentByCQL, options?: RequestOptions): Promise<ContentArray> =>
        content.searchContentByCQL(client, parameters, options),
    },
    experimental: {
      deletePageTree: (parameters: DeletePageTree, options?: RequestOptions): Promise<LongTask> =>
        experimental.deletePageTree(client, parameters, options),
      getLabelsForSpace: (parameters: GetLabelsForSpace, options?: RequestOptions): Promise<LabelArray> =>
        experimental.getLabelsForSpace(client, parameters, options),
      addLabelsToSpace: (parameters: AddLabelsToSpace, options?: RequestOptions): Promise<LabelArray> =>
        experimental.addLabelsToSpace(client, parameters, options),
      deleteLabelFromSpace: (parameters: DeleteLabelFromSpace, options?: RequestOptions): Promise<void> =>
        experimental.deleteLabelFromSpace(client, parameters, options),
    },
    contentChildrenAndDescendants: {
      movePage: (parameters: MovePage, options?: RequestOptions): Promise<MovePageModel> =>
        contentChildrenAndDescendants.movePage(client, parameters, options),
      getContentDescendants: (parameters: GetContentDescendants, options?: RequestOptions): Promise<ContentChildren> =>
        contentChildrenAndDescendants.getContentDescendants(client, parameters, options),
      getDescendantsOfType: (parameters: GetDescendantsOfType, options?: RequestOptions): Promise<ContentArray> =>
        contentChildrenAndDescendants.getDescendantsOfType(client, parameters, options),
      copyPageHierarchy: (parameters: CopyPageHierarchy, options?: RequestOptions): Promise<LongTask> =>
        contentChildrenAndDescendants.copyPageHierarchy(client, parameters, options),
      copyPage: (parameters: CopyPage, options?: RequestOptions): Promise<Content> =>
        contentChildrenAndDescendants.copyPage(client, parameters, options),
    },
    contentAttachments: {
      createAttachment: (parameters: CreateAttachment, options?: RequestOptions): Promise<ContentArray> =>
        contentAttachments.createAttachment(client, parameters, options),
      createOrUpdateAttachments: (
        parameters: CreateOrUpdateAttachments,
        options?: RequestOptions,
      ): Promise<ContentArray> => contentAttachments.createOrUpdateAttachments(client, parameters, options),
      updateAttachmentProperties: (
        parameters: UpdateAttachmentProperties,
        options?: RequestOptions,
      ): Promise<Content> => contentAttachments.updateAttachmentProperties(client, parameters, options),
      updateAttachmentData: (parameters: UpdateAttachmentData, options?: RequestOptions): Promise<Content> =>
        contentAttachments.updateAttachmentData(client, parameters, options),
      downloadAttatchment: (parameters: DownloadAttatchment, options?: RequestOptions): Promise<Buffer> =>
        contentAttachments.downloadAttatchment(client, parameters, options),
    },
    contentMacroBody: {
      getMacroBodyByMacroId: (parameters: GetMacroBodyByMacroId, options?: RequestOptions): Promise<MacroInstance> =>
        contentMacroBody.getMacroBodyByMacroId(client, parameters, options),
      getAndConvertMacroBodyByMacroId: (
        parameters: GetAndConvertMacroBodyByMacroId,
        options?: RequestOptions,
      ): Promise<ContentBody> => contentMacroBody.getAndConvertMacroBodyByMacroId(client, parameters, options),
      getAndAsyncConvertMacroBodyByMacroId: (
        parameters: GetAndAsyncConvertMacroBodyByMacroId,
        options?: RequestOptions,
      ): Promise<AsyncId> => contentMacroBody.getAndAsyncConvertMacroBodyByMacroId(client, parameters, options),
    },
    contentLabels: {
      addLabelsToContent: (parameters: AddLabelsToContent, options?: RequestOptions): Promise<LabelArray> =>
        contentLabels.addLabelsToContent(client, parameters, options),
      removeLabelFromContentUsingQueryParameter: (
        parameters: RemoveLabelFromContentUsingQueryParameter,
        options?: RequestOptions,
      ): Promise<void> => contentLabels.removeLabelFromContentUsingQueryParameter(client, parameters, options),
      removeLabelFromContent: (parameters: RemoveLabelFromContent, options?: RequestOptions): Promise<void> =>
        contentLabels.removeLabelFromContent(client, parameters, options),
    },
    contentWatches: {
      getWatchesForPage: (parameters: GetWatchesForPage, options?: RequestOptions): Promise<WatchArray> =>
        contentWatches.getWatchesForPage(client, parameters, options),
      getWatchesForSpace: (parameters: GetWatchesForSpace, options?: RequestOptions): Promise<SpaceWatchArray> =>
        contentWatches.getWatchesForSpace(client, parameters, options),
      getWatchersForSpace: (parameters: GetWatchersForSpace, options?: RequestOptions): Promise<SpaceWatchArray> =>
        contentWatches.getWatchersForSpace(client, parameters, options),
      getContentWatchStatus: (parameters: GetContentWatchStatus, options?: RequestOptions): Promise<UserWatch> =>
        contentWatches.getContentWatchStatus(client, parameters, options),
      addContentWatcher: (parameters: AddContentWatcher, options?: RequestOptions): Promise<void> =>
        contentWatches.addContentWatcher(client, parameters, options),
      removeContentWatcher: (parameters: RemoveContentWatcher, options?: RequestOptions): Promise<void> =>
        contentWatches.removeContentWatcher(client, parameters, options),
      isWatchingLabel: (parameters: IsWatchingLabel, options?: RequestOptions): Promise<UserWatch> =>
        contentWatches.isWatchingLabel(client, parameters, options),
      addLabelWatcher: (parameters: AddLabelWatcher, options?: RequestOptions): Promise<void> =>
        contentWatches.addLabelWatcher(client, parameters, options),
      removeLabelWatcher: (parameters: RemoveLabelWatcher, options?: RequestOptions): Promise<void> =>
        contentWatches.removeLabelWatcher(client, parameters, options),
      isWatchingSpace: (parameters: IsWatchingSpace, options?: RequestOptions): Promise<UserWatch> =>
        contentWatches.isWatchingSpace(client, parameters, options),
      addSpaceWatcher: (parameters: AddSpaceWatcher, options?: RequestOptions): Promise<void> =>
        contentWatches.addSpaceWatcher(client, parameters, options),
      removeSpaceWatch: (parameters: RemoveSpaceWatch, options?: RequestOptions): Promise<void> =>
        contentWatches.removeSpaceWatch(client, parameters, options),
    },
    contentPermissions: {
      checkContentPermission: (
        parameters: CheckContentPermission,
        options?: RequestOptions,
      ): Promise<PermissionCheckResponse> => contentPermissions.checkContentPermission(client, parameters, options),
    },
    contentRestrictions: {
      getRestrictions: (parameters: GetRestrictions, options?: RequestOptions): Promise<ContentRestrictionArray> =>
        contentRestrictions.getRestrictions(client, parameters, options),
      addRestrictions: (parameters: AddRestrictions, options?: RequestOptions): Promise<ContentRestrictionArray> =>
        contentRestrictions.addRestrictions(client, parameters, options),
      updateRestrictions: (
        parameters: UpdateRestrictions,
        options?: RequestOptions,
      ): Promise<ContentRestrictionArray> => contentRestrictions.updateRestrictions(client, parameters, options),
      deleteRestrictions: (
        parameters: DeleteRestrictions,
        options?: RequestOptions,
      ): Promise<ContentRestrictionArray> => contentRestrictions.deleteRestrictions(client, parameters, options),
      getRestrictionsByOperation: (
        parameters: GetRestrictionsByOperation,
        options?: RequestOptions,
      ): Promise<GetRestrictionsByOperationModel> =>
        contentRestrictions.getRestrictionsByOperation(client, parameters, options),
      getRestrictionsForOperation: (
        parameters: GetRestrictionsForOperation,
        options?: RequestOptions,
      ): Promise<ContentRestriction> => contentRestrictions.getRestrictionsForOperation(client, parameters, options),
      getIndividualGroupRestrictionStatusByGroupId: (
        parameters: GetIndividualGroupRestrictionStatusByGroupId,
        options?: RequestOptions,
      ): Promise<void> => contentRestrictions.getIndividualGroupRestrictionStatusByGroupId(client, parameters, options),
      addGroupToContentRestrictionByGroupId: (
        parameters: AddGroupToContentRestrictionByGroupId,
        options?: RequestOptions,
      ): Promise<void> => contentRestrictions.addGroupToContentRestrictionByGroupId(client, parameters, options),
      removeGroupFromContentRestriction: (
        parameters: RemoveGroupFromContentRestriction,
        options?: RequestOptions,
      ): Promise<void> => contentRestrictions.removeGroupFromContentRestriction(client, parameters, options),
      getContentRestrictionStatusForUser: (
        parameters: GetContentRestrictionStatusForUser,
        options?: RequestOptions,
      ): Promise<void> => contentRestrictions.getContentRestrictionStatusForUser(client, parameters, options),
      addUserToContentRestriction: (parameters: AddUserToContentRestriction, options?: RequestOptions): Promise<void> =>
        contentRestrictions.addUserToContentRestriction(client, parameters, options),
      removeUserFromContentRestriction: (
        parameters: RemoveUserFromContentRestriction,
        options?: RequestOptions,
      ): Promise<void> => contentRestrictions.removeUserFromContentRestriction(client, parameters, options),
    },
    contentStates: {
      getContentState: (parameters: GetContentState, options?: RequestOptions): Promise<ContentStateResponse> =>
        contentStates.getContentState(client, parameters, options),
      setContentState: (parameters: SetContentState, options?: RequestOptions): Promise<ContentStateResponse> =>
        contentStates.setContentState(client, parameters, options),
      removeContentState: (parameters: RemoveContentState, options?: RequestOptions): Promise<ContentStateResponse> =>
        contentStates.removeContentState(client, parameters, options),
      getAvailableContentStates: (
        parameters: GetAvailableContentStates,
        options?: RequestOptions,
      ): Promise<AvailableContentStates> => contentStates.getAvailableContentStates(client, parameters, options),
      getCustomContentStates: (options?: RequestOptions): Promise<ContentState[]> =>
        contentStates.getCustomContentStates(client, options),
      getSpaceContentStates: (parameters: GetSpaceContentStates, options?: RequestOptions): Promise<ContentState[]> =>
        contentStates.getSpaceContentStates(client, parameters, options),
      getContentStateSettings: (
        parameters: GetContentStateSettings,
        options?: RequestOptions,
      ): Promise<ContentStateSettings> => contentStates.getContentStateSettings(client, parameters, options),
      getContentsWithState: (parameters: GetContentsWithState, options?: RequestOptions): Promise<ContentArray> =>
        contentStates.getContentsWithState(client, parameters, options),
    },
    contentVersions: {
      restoreContentVersion: (parameters: RestoreContentVersion, options?: RequestOptions): Promise<Version> =>
        contentVersions.restoreContentVersion(client, parameters, options),
      deleteContentVersion: (parameters: DeleteContentVersion, options?: RequestOptions): Promise<void> =>
        contentVersions.deleteContentVersion(client, parameters, options),
    },
    contentBody: {
      asyncConvertContentBodyRequest: (
        parameters: AsyncConvertContentBodyRequest,
        options?: RequestOptions,
      ): Promise<AsyncId> => contentBody.asyncConvertContentBodyRequest(client, parameters, options),
      asyncConvertContentBodyResponse: (
        parameters: AsyncConvertContentBodyResponse,
        options?: RequestOptions,
      ): Promise<AsyncContentBody> => contentBody.asyncConvertContentBodyResponse(client, parameters, options),
      bulkAsyncConvertContentBodyResponse: (
        parameters: BulkAsyncConvertContentBodyResponse,
        options?: RequestOptions,
      ): Promise<AsyncContentBodyArray> => contentBody.bulkAsyncConvertContentBodyResponse(client, parameters, options),
      bulkAsyncConvertContentBodyRequest: (
        parameters: BulkAsyncConvertContentBodyRequest,
        options?: RequestOptions,
      ): Promise<AsyncIdArray> => contentBody.bulkAsyncConvertContentBodyRequest(client, parameters, options),
    },
    labelInfo: {
      getAllLabelContent: (parameters: GetAllLabelContent, options?: RequestOptions): Promise<LabelDetails> =>
        labelInfo.getAllLabelContent(client, parameters, options),
    },
    group: {
      getGroups: (parameters?: GetGroups, options?: RequestOptions): Promise<GroupArrayWithLinks> =>
        group.getGroups(client, parameters, options),
      createGroup: (parameters: CreateGroup, options?: RequestOptions): Promise<Group> =>
        group.createGroup(client, parameters, options),
      getGroupByGroupId: (parameters: GetGroupByGroupId, options?: RequestOptions): Promise<Group> =>
        group.getGroupByGroupId(client, parameters, options),
      removeGroupById: (parameters: RemoveGroupById, options?: RequestOptions): Promise<void> =>
        group.removeGroupById(client, parameters, options),
      searchGroups: (parameters: SearchGroups, options?: RequestOptions): Promise<GroupArrayWithLinks> =>
        group.searchGroups(client, parameters, options),
      getGroupMembersByGroupId: (parameters: GetGroupMembersByGroupId, options?: RequestOptions): Promise<UserArray> =>
        group.getGroupMembersByGroupId(client, parameters, options),
      addUserToGroupByGroupId: (parameters: AddUserToGroupByGroupId, options?: RequestOptions): Promise<void> =>
        group.addUserToGroupByGroupId(client, parameters, options),
      removeMemberFromGroupByGroupId: (
        parameters: RemoveMemberFromGroupByGroupId,
        options?: RequestOptions,
      ): Promise<void> => group.removeMemberFromGroupByGroupId(client, parameters, options),
    },
    longRunningTask: {
      getTasks: (parameters?: GetTasks, options?: RequestOptions): Promise<LongTaskStatusArray> =>
        longRunningTask.getTasks(client, parameters, options),
      getTask: (parameters: GetTask, options?: RequestOptions): Promise<LongTaskStatusWithLinks> =>
        longRunningTask.getTask(client, parameters, options),
    },
    relation: {
      findTargetFromSource: (parameters: FindTargetFromSource, options?: RequestOptions): Promise<RelationArray> =>
        relation.findTargetFromSource(client, parameters, options),
      getRelationship: (parameters: GetRelationship, options?: RequestOptions): Promise<Relation> =>
        relation.getRelationship(client, parameters, options),
      createRelationship: (parameters: CreateRelationship, options?: RequestOptions): Promise<Relation> =>
        relation.createRelationship(client, parameters, options),
      deleteRelationship: (parameters: DeleteRelationship, options?: RequestOptions): Promise<void> =>
        relation.deleteRelationship(client, parameters, options),
      findSourcesForTarget: (parameters: FindSourcesForTarget, options?: RequestOptions): Promise<RelationArray> =>
        relation.findSourcesForTarget(client, parameters, options),
    },
    search: {
      searchByCQL: (parameters: SearchByCQL, options?: RequestOptions): Promise<SearchPageResponseSearchResult> =>
        search.searchByCQL(client, parameters, options),
      searchUser: (parameters: SearchUser, options?: RequestOptions): Promise<SearchPageResponseSearchResult> =>
        search.searchUser(client, parameters, options),
    },
    settings: {
      getLookAndFeelSettings: (
        parameters?: GetLookAndFeelSettings,
        options?: RequestOptions,
      ): Promise<LookAndFeelSettings> => settings.getLookAndFeelSettings(client, parameters, options),
      updateLookAndFeel: (parameters: UpdateLookAndFeel, options?: RequestOptions): Promise<LookAndFeelSelection> =>
        settings.updateLookAndFeel(client, parameters, options),
      updateLookAndFeelSettings: (
        parameters: UpdateLookAndFeelSettings,
        options?: RequestOptions,
      ): Promise<LookAndFeelWithLinks> => settings.updateLookAndFeelSettings(client, parameters, options),
      resetLookAndFeelSettings: (parameters: ResetLookAndFeelSettings, options?: RequestOptions): Promise<void> =>
        settings.resetLookAndFeelSettings(client, parameters, options),
      getSystemInfo: (options?: RequestOptions): Promise<SystemInfoEntity> => settings.getSystemInfo(client, options),
    },
    themes: {
      getThemes: (parameters?: GetThemes, options?: RequestOptions): Promise<ThemeArray> =>
        themes.getThemes(client, parameters, options),
      getGlobalTheme: (options?: RequestOptions): Promise<Theme> => themes.getGlobalTheme(client, options),
      getTheme: (parameters: GetTheme, options?: RequestOptions): Promise<Theme> =>
        themes.getTheme(client, parameters, options),
      getSpaceTheme: (parameters: GetSpaceTheme, options?: RequestOptions): Promise<Theme> =>
        themes.getSpaceTheme(client, parameters, options),
      setSpaceTheme: (parameters: SetSpaceTheme, options?: RequestOptions): Promise<Theme> =>
        themes.setSpaceTheme(client, parameters, options),
      resetSpaceTheme: (parameters: ResetSpaceTheme, options?: RequestOptions): Promise<void> =>
        themes.resetSpaceTheme(client, parameters, options),
    },
    space: {
      createSpace: (parameters: CreateSpace, options?: RequestOptions): Promise<Space> =>
        space.createSpace(client, parameters, options),
      createPrivateSpace: (parameters: CreatePrivateSpace, options?: RequestOptions): Promise<Space> =>
        space.createPrivateSpace(client, parameters, options),
      updateSpace: (parameters: UpdateSpace, options?: RequestOptions): Promise<Space> =>
        space.updateSpace(client, parameters, options),
      deleteSpace: (parameters: DeleteSpace, options?: RequestOptions): Promise<LongTask> =>
        space.deleteSpace(client, parameters, options),
    },
    spacePermissions: {
      addPermissionToSpace: (parameters: AddPermissionToSpace, options?: RequestOptions): Promise<SpacePermissionV2> =>
        spacePermissions.addPermissionToSpace(client, parameters, options),
      addCustomContentPermissions: (parameters: AddCustomContentPermissions, options?: RequestOptions): Promise<void> =>
        spacePermissions.addCustomContentPermissions(client, parameters, options),
      removePermission: (parameters: RemovePermission, options?: RequestOptions): Promise<void> =>
        spacePermissions.removePermission(client, parameters, options),
    },
    spaceSettings: {
      getSpaceSettings: (parameters: GetSpaceSettings, options?: RequestOptions): Promise<SpaceSettings> =>
        spaceSettings.getSpaceSettings(client, parameters, options),
      updateSpaceSettings: (parameters: UpdateSpaceSettings, options?: RequestOptions): Promise<SpaceSettings> =>
        spaceSettings.updateSpaceSettings(client, parameters, options),
    },
    template: {
      createContentTemplate: (parameters: CreateContentTemplate, options?: RequestOptions): Promise<ContentTemplate> =>
        template.createContentTemplate(client, parameters, options),
      updateContentTemplate: (parameters: UpdateContentTemplate, options?: RequestOptions): Promise<ContentTemplate> =>
        template.updateContentTemplate(client, parameters, options),
      getBlueprintTemplates: (
        parameters?: GetBlueprintTemplates,
        options?: RequestOptions,
      ): Promise<BlueprintTemplateArray> => template.getBlueprintTemplates(client, parameters, options),
      getContentTemplates: (
        parameters?: GetContentTemplates,
        options?: RequestOptions,
      ): Promise<ContentTemplateArray> => template.getContentTemplates(client, parameters, options),
      getContentTemplate: (parameters: GetContentTemplate, options?: RequestOptions): Promise<ContentTemplate> =>
        template.getContentTemplate(client, parameters, options),
      removeTemplate: (parameters: RemoveTemplate, options?: RequestOptions): Promise<void> =>
        template.removeTemplate(client, parameters, options),
    },
    users: {
      getUser: (parameters: GetUser, options?: RequestOptions): Promise<User> =>
        users.getUser(client, parameters, options),
      getAnonymousUser: (parameters?: GetAnonymousUser, options?: RequestOptions): Promise<UserAnonymous> =>
        users.getAnonymousUser(client, parameters, options),
      getCurrentUser: (parameters?: GetCurrentUser, options?: RequestOptions): Promise<User> =>
        users.getCurrentUser(client, parameters, options),
      getGroupMembershipsForUser: (
        parameters: GetGroupMembershipsForUser,
        options?: RequestOptions,
      ): Promise<GroupArrayWithLinks> => users.getGroupMembershipsForUser(client, parameters, options),
      getBulkUserLookup: (parameters: GetBulkUserLookup, options?: RequestOptions): Promise<BulkUserLookupArray> =>
        users.getBulkUserLookup(client, parameters, options),
      getPrivacyUnsafeUserEmail: (
        parameters: GetPrivacyUnsafeUserEmail,
        options?: RequestOptions,
      ): Promise<AccountIdEmailRecord> => users.getPrivacyUnsafeUserEmail(client, parameters, options),
      getPrivacyUnsafeUserEmailBulk: (
        parameters: GetPrivacyUnsafeUserEmailBulk,
        options?: RequestOptions,
      ): Promise<AccountIdEmailRecordArray> => users.getPrivacyUnsafeUserEmailBulk(client, parameters, options),
    },
    dynamicModules: {
      getModules: (options?: RequestOptions): Promise<unknown> => dynamicModules.getModules(client, options),
      registerModules: (parameters: RegisterModules, options?: RequestOptions): Promise<void> =>
        dynamicModules.registerModules(client, parameters, options),
      removeModules: (parameters: RemoveModules, options?: RequestOptions): Promise<void> =>
        dynamicModules.removeModules(client, parameters, options),
    },
    analytics: {
      getViews: (parameters: GetViews, options?: RequestOptions): Promise<GetViewsModel> =>
        analytics.getViews(client, parameters, options),
      getViewers: (parameters: GetViewers, options?: RequestOptions): Promise<GetViewersModel> =>
        analytics.getViewers(client, parameters, options),
    },
    userProperties: {
      getUserProperties: (parameters: GetUserProperties, options?: RequestOptions): Promise<UserPropertyKeyArray> =>
        userProperties.getUserProperties(client, parameters, options),
      getUserProperty: (parameters: GetUserProperty, options?: RequestOptions): Promise<UserProperty> =>
        userProperties.getUserProperty(client, parameters, options),
      createUserProperty: (parameters: CreateUserProperty, options?: RequestOptions): Promise<void> =>
        userProperties.createUserProperty(client, parameters, options),
      updateUserProperty: (parameters: UpdateUserProperty, options?: RequestOptions): Promise<void> =>
        userProperties.updateUserProperty(client, parameters, options),
      deleteUserProperty: (parameters: DeleteUserProperty, options?: RequestOptions): Promise<void> =>
        userProperties.deleteUserProperty(client, parameters, options),
    },
  };
}

export type V1Client = ReturnType<typeof createV1Client>;
