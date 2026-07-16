import { type ClientConfig, createClient } from '#/core';
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
export function createV1Client(clientConfig: ClientConfig) {
  const client = createClient(clientConfig);
  return {
    audit: {
      getAuditRecords: (parameters?: GetAuditRecords): Promise<AuditRecordArray> =>
        audit.getAuditRecords(client, parameters),
      createAuditRecord: (parameters: CreateAuditRecord): Promise<AuditRecord> =>
        audit.createAuditRecord(client, parameters),
      exportAuditRecords: (parameters?: ExportAuditRecords): Promise<unknown> =>
        audit.exportAuditRecords(client, parameters),
      getRetentionPeriod: (): Promise<RetentionPeriod> => audit.getRetentionPeriod(client),
      setRetentionPeriod: (parameters: SetRetentionPeriod): Promise<RetentionPeriod> =>
        audit.setRetentionPeriod(client, parameters),
      getAuditRecordsForTimePeriod: (parameters?: GetAuditRecordsForTimePeriod): Promise<AuditRecordArray> =>
        audit.getAuditRecordsForTimePeriod(client, parameters),
    },
    content: {
      archivePages: (parameters: ArchivePages): Promise<LongTask> => content.archivePages(client, parameters),
      publishLegacyDraft: (parameters: PublishLegacyDraft): Promise<Content> =>
        content.publishLegacyDraft(client, parameters),
      publishSharedDraft: (parameters: PublishSharedDraft): Promise<Content> =>
        content.publishSharedDraft(client, parameters),
      searchContentByCQL: (parameters: SearchContentByCQL): Promise<ContentArray> =>
        content.searchContentByCQL(client, parameters),
    },
    experimental: {
      deletePageTree: (parameters: DeletePageTree): Promise<LongTask> =>
        experimental.deletePageTree(client, parameters),
      getLabelsForSpace: (parameters: GetLabelsForSpace): Promise<LabelArray> =>
        experimental.getLabelsForSpace(client, parameters),
      addLabelsToSpace: (parameters: AddLabelsToSpace): Promise<LabelArray> =>
        experimental.addLabelsToSpace(client, parameters),
      deleteLabelFromSpace: (parameters: DeleteLabelFromSpace): Promise<void> =>
        experimental.deleteLabelFromSpace(client, parameters),
    },
    contentChildrenAndDescendants: {
      movePage: (parameters: MovePage): Promise<MovePageModel> =>
        contentChildrenAndDescendants.movePage(client, parameters),
      getContentDescendants: (parameters: GetContentDescendants): Promise<ContentChildren> =>
        contentChildrenAndDescendants.getContentDescendants(client, parameters),
      getDescendantsOfType: (parameters: GetDescendantsOfType): Promise<ContentArray> =>
        contentChildrenAndDescendants.getDescendantsOfType(client, parameters),
      copyPageHierarchy: (parameters: CopyPageHierarchy): Promise<LongTask> =>
        contentChildrenAndDescendants.copyPageHierarchy(client, parameters),
      copyPage: (parameters: CopyPage): Promise<unknown> => contentChildrenAndDescendants.copyPage(client, parameters),
    },
    contentAttachments: {
      createAttachment: (parameters: CreateAttachment): Promise<ContentArray> =>
        contentAttachments.createAttachment(client, parameters),
      createOrUpdateAttachments: (parameters: CreateOrUpdateAttachments): Promise<ContentArray> =>
        contentAttachments.createOrUpdateAttachments(client, parameters),
      updateAttachmentProperties: (parameters: UpdateAttachmentProperties): Promise<Content> =>
        contentAttachments.updateAttachmentProperties(client, parameters),
      updateAttachmentData: (parameters: UpdateAttachmentData): Promise<Content> =>
        contentAttachments.updateAttachmentData(client, parameters),
      downloadAttatchment: (parameters: DownloadAttatchment): Promise<unknown> =>
        contentAttachments.downloadAttatchment(client, parameters),
    },
    contentMacroBody: {
      getMacroBodyByMacroId: (parameters: GetMacroBodyByMacroId): Promise<MacroInstance> =>
        contentMacroBody.getMacroBodyByMacroId(client, parameters),
      getAndConvertMacroBodyByMacroId: (parameters: GetAndConvertMacroBodyByMacroId): Promise<ContentBody> =>
        contentMacroBody.getAndConvertMacroBodyByMacroId(client, parameters),
      getAndAsyncConvertMacroBodyByMacroId: (parameters: GetAndAsyncConvertMacroBodyByMacroId): Promise<AsyncId> =>
        contentMacroBody.getAndAsyncConvertMacroBodyByMacroId(client, parameters),
    },
    contentLabels: {
      addLabelsToContent: (parameters: AddLabelsToContent): Promise<LabelArray> =>
        contentLabels.addLabelsToContent(client, parameters),
      removeLabelFromContentUsingQueryParameter: (
        parameters: RemoveLabelFromContentUsingQueryParameter,
      ): Promise<void> => contentLabels.removeLabelFromContentUsingQueryParameter(client, parameters),
      removeLabelFromContent: (parameters: RemoveLabelFromContent): Promise<void> =>
        contentLabels.removeLabelFromContent(client, parameters),
    },
    contentWatches: {
      getWatchesForPage: (parameters: GetWatchesForPage): Promise<WatchArray> =>
        contentWatches.getWatchesForPage(client, parameters),
      getWatchesForSpace: (parameters: GetWatchesForSpace): Promise<SpaceWatchArray> =>
        contentWatches.getWatchesForSpace(client, parameters),
      getWatchersForSpace: (parameters: GetWatchersForSpace): Promise<SpaceWatchArray> =>
        contentWatches.getWatchersForSpace(client, parameters),
      getContentWatchStatus: (parameters: GetContentWatchStatus): Promise<UserWatch> =>
        contentWatches.getContentWatchStatus(client, parameters),
      addContentWatcher: (parameters: AddContentWatcher): Promise<void> =>
        contentWatches.addContentWatcher(client, parameters),
      removeContentWatcher: (parameters: RemoveContentWatcher): Promise<void> =>
        contentWatches.removeContentWatcher(client, parameters),
      isWatchingLabel: (parameters: IsWatchingLabel): Promise<UserWatch> =>
        contentWatches.isWatchingLabel(client, parameters),
      addLabelWatcher: (parameters: AddLabelWatcher): Promise<void> =>
        contentWatches.addLabelWatcher(client, parameters),
      removeLabelWatcher: (parameters: RemoveLabelWatcher): Promise<void> =>
        contentWatches.removeLabelWatcher(client, parameters),
      isWatchingSpace: (parameters: IsWatchingSpace): Promise<UserWatch> =>
        contentWatches.isWatchingSpace(client, parameters),
      addSpaceWatcher: (parameters: AddSpaceWatcher): Promise<void> =>
        contentWatches.addSpaceWatcher(client, parameters),
      removeSpaceWatch: (parameters: RemoveSpaceWatch): Promise<void> =>
        contentWatches.removeSpaceWatch(client, parameters),
    },
    contentPermissions: {
      checkContentPermission: (parameters: CheckContentPermission): Promise<PermissionCheckResponse> =>
        contentPermissions.checkContentPermission(client, parameters),
    },
    contentRestrictions: {
      getRestrictions: (parameters: GetRestrictions): Promise<ContentRestrictionArray> =>
        contentRestrictions.getRestrictions(client, parameters),
      addRestrictions: (parameters: AddRestrictions): Promise<ContentRestrictionArray> =>
        contentRestrictions.addRestrictions(client, parameters),
      updateRestrictions: (parameters: UpdateRestrictions): Promise<ContentRestrictionArray> =>
        contentRestrictions.updateRestrictions(client, parameters),
      deleteRestrictions: (parameters: DeleteRestrictions): Promise<ContentRestrictionArray> =>
        contentRestrictions.deleteRestrictions(client, parameters),
      getRestrictionsByOperation: (parameters: GetRestrictionsByOperation): Promise<unknown> =>
        contentRestrictions.getRestrictionsByOperation(client, parameters),
      getRestrictionsForOperation: (parameters: GetRestrictionsForOperation): Promise<ContentRestriction> =>
        contentRestrictions.getRestrictionsForOperation(client, parameters),
      getIndividualGroupRestrictionStatusByGroupId: (
        parameters: GetIndividualGroupRestrictionStatusByGroupId,
      ): Promise<void> => contentRestrictions.getIndividualGroupRestrictionStatusByGroupId(client, parameters),
      addGroupToContentRestrictionByGroupId: (parameters: AddGroupToContentRestrictionByGroupId): Promise<void> =>
        contentRestrictions.addGroupToContentRestrictionByGroupId(client, parameters),
      removeGroupFromContentRestriction: (parameters: RemoveGroupFromContentRestriction): Promise<void> =>
        contentRestrictions.removeGroupFromContentRestriction(client, parameters),
      getContentRestrictionStatusForUser: (parameters: GetContentRestrictionStatusForUser): Promise<void> =>
        contentRestrictions.getContentRestrictionStatusForUser(client, parameters),
      addUserToContentRestriction: (parameters: AddUserToContentRestriction): Promise<void> =>
        contentRestrictions.addUserToContentRestriction(client, parameters),
      removeUserFromContentRestriction: (parameters: RemoveUserFromContentRestriction): Promise<void> =>
        contentRestrictions.removeUserFromContentRestriction(client, parameters),
    },
    contentStates: {
      getContentState: (parameters: GetContentState): Promise<ContentStateResponse> =>
        contentStates.getContentState(client, parameters),
      setContentState: (parameters: SetContentState): Promise<ContentStateResponse> =>
        contentStates.setContentState(client, parameters),
      removeContentState: (parameters: RemoveContentState): Promise<ContentStateResponse> =>
        contentStates.removeContentState(client, parameters),
      getAvailableContentStates: (parameters: GetAvailableContentStates): Promise<AvailableContentStates> =>
        contentStates.getAvailableContentStates(client, parameters),
      getCustomContentStates: (): Promise<ContentState[]> => contentStates.getCustomContentStates(client),
      getSpaceContentStates: (parameters: GetSpaceContentStates): Promise<ContentState[]> =>
        contentStates.getSpaceContentStates(client, parameters),
      getContentStateSettings: (parameters: GetContentStateSettings): Promise<ContentStateSettings> =>
        contentStates.getContentStateSettings(client, parameters),
      getContentsWithState: (parameters: GetContentsWithState): Promise<ContentArray> =>
        contentStates.getContentsWithState(client, parameters),
    },
    contentVersions: {
      restoreContentVersion: (parameters: RestoreContentVersion): Promise<Version> =>
        contentVersions.restoreContentVersion(client, parameters),
      deleteContentVersion: (parameters: DeleteContentVersion): Promise<void> =>
        contentVersions.deleteContentVersion(client, parameters),
    },
    contentBody: {
      asyncConvertContentBodyRequest: (parameters: AsyncConvertContentBodyRequest): Promise<AsyncId> =>
        contentBody.asyncConvertContentBodyRequest(client, parameters),
      asyncConvertContentBodyResponse: (parameters: AsyncConvertContentBodyResponse): Promise<AsyncContentBody> =>
        contentBody.asyncConvertContentBodyResponse(client, parameters),
      bulkAsyncConvertContentBodyResponse: (
        parameters: BulkAsyncConvertContentBodyResponse,
      ): Promise<AsyncContentBodyArray> => contentBody.bulkAsyncConvertContentBodyResponse(client, parameters),
      bulkAsyncConvertContentBodyRequest: (parameters: BulkAsyncConvertContentBodyRequest): Promise<AsyncIdArray> =>
        contentBody.bulkAsyncConvertContentBodyRequest(client, parameters),
    },
    labelInfo: {
      getAllLabelContent: (parameters: GetAllLabelContent): Promise<LabelDetails> =>
        labelInfo.getAllLabelContent(client, parameters),
    },
    group: {
      getGroups: (parameters?: GetGroups): Promise<GroupArrayWithLinks> => group.getGroups(client, parameters),
      createGroup: (parameters: CreateGroup): Promise<Group> => group.createGroup(client, parameters),
      getGroupByGroupId: (parameters: GetGroupByGroupId): Promise<Group> => group.getGroupByGroupId(client, parameters),
      removeGroupById: (parameters: RemoveGroupById): Promise<void> => group.removeGroupById(client, parameters),
      searchGroups: (parameters: SearchGroups): Promise<GroupArrayWithLinks> => group.searchGroups(client, parameters),
      getGroupMembersByGroupId: (parameters: GetGroupMembersByGroupId): Promise<UserArray> =>
        group.getGroupMembersByGroupId(client, parameters),
      addUserToGroupByGroupId: (parameters: AddUserToGroupByGroupId): Promise<void> =>
        group.addUserToGroupByGroupId(client, parameters),
      removeMemberFromGroupByGroupId: (parameters: RemoveMemberFromGroupByGroupId): Promise<void> =>
        group.removeMemberFromGroupByGroupId(client, parameters),
    },
    longRunningTask: {
      getTasks: (parameters?: GetTasks): Promise<LongTaskStatusArray> => longRunningTask.getTasks(client, parameters),
      getTask: (parameters: GetTask): Promise<LongTaskStatusWithLinks> => longRunningTask.getTask(client, parameters),
    },
    relation: {
      findTargetFromSource: (parameters: FindTargetFromSource): Promise<RelationArray> =>
        relation.findTargetFromSource(client, parameters),
      getRelationship: (parameters: GetRelationship): Promise<Relation> => relation.getRelationship(client, parameters),
      createRelationship: (parameters: CreateRelationship): Promise<Relation> =>
        relation.createRelationship(client, parameters),
      deleteRelationship: (parameters: DeleteRelationship): Promise<void> =>
        relation.deleteRelationship(client, parameters),
      findSourcesForTarget: (parameters: FindSourcesForTarget): Promise<RelationArray> =>
        relation.findSourcesForTarget(client, parameters),
    },
    search: {
      searchByCQL: (parameters: SearchByCQL): Promise<SearchPageResponseSearchResult> =>
        search.searchByCQL(client, parameters),
      searchUser: (parameters: SearchUser): Promise<SearchPageResponseSearchResult> =>
        search.searchUser(client, parameters),
    },
    settings: {
      getLookAndFeelSettings: (parameters?: GetLookAndFeelSettings): Promise<LookAndFeelSettings> =>
        settings.getLookAndFeelSettings(client, parameters),
      updateLookAndFeel: (parameters: UpdateLookAndFeel): Promise<LookAndFeelSelection> =>
        settings.updateLookAndFeel(client, parameters),
      updateLookAndFeelSettings: (parameters: UpdateLookAndFeelSettings): Promise<LookAndFeelWithLinks> =>
        settings.updateLookAndFeelSettings(client, parameters),
      resetLookAndFeelSettings: (parameters: ResetLookAndFeelSettings): Promise<void> =>
        settings.resetLookAndFeelSettings(client, parameters),
      getSystemInfo: (): Promise<SystemInfoEntity> => settings.getSystemInfo(client),
    },
    themes: {
      getThemes: (parameters?: GetThemes): Promise<ThemeArray> => themes.getThemes(client, parameters),
      getGlobalTheme: (): Promise<Theme> => themes.getGlobalTheme(client),
      getTheme: (parameters: GetTheme): Promise<Theme> => themes.getTheme(client, parameters),
      getSpaceTheme: (parameters: GetSpaceTheme): Promise<Theme> => themes.getSpaceTheme(client, parameters),
      setSpaceTheme: (parameters: SetSpaceTheme): Promise<Theme> => themes.setSpaceTheme(client, parameters),
      resetSpaceTheme: (parameters: ResetSpaceTheme): Promise<void> => themes.resetSpaceTheme(client, parameters),
    },
    space: {
      createSpace: (parameters: CreateSpace): Promise<Space> => space.createSpace(client, parameters),
      createPrivateSpace: (parameters: CreatePrivateSpace): Promise<Space> =>
        space.createPrivateSpace(client, parameters),
      updateSpace: (parameters: UpdateSpace): Promise<Space> => space.updateSpace(client, parameters),
      deleteSpace: (parameters: DeleteSpace): Promise<LongTask> => space.deleteSpace(client, parameters),
    },
    spacePermissions: {
      addPermissionToSpace: (parameters: AddPermissionToSpace): Promise<SpacePermissionV2> =>
        spacePermissions.addPermissionToSpace(client, parameters),
      addCustomContentPermissions: (parameters: AddCustomContentPermissions): Promise<void> =>
        spacePermissions.addCustomContentPermissions(client, parameters),
      removePermission: (parameters: RemovePermission): Promise<void> =>
        spacePermissions.removePermission(client, parameters),
    },
    spaceSettings: {
      getSpaceSettings: (parameters: GetSpaceSettings): Promise<SpaceSettings> =>
        spaceSettings.getSpaceSettings(client, parameters),
      updateSpaceSettings: (parameters: UpdateSpaceSettings): Promise<SpaceSettings> =>
        spaceSettings.updateSpaceSettings(client, parameters),
    },
    template: {
      createContentTemplate: (parameters: CreateContentTemplate): Promise<ContentTemplate> =>
        template.createContentTemplate(client, parameters),
      updateContentTemplate: (parameters: UpdateContentTemplate): Promise<ContentTemplate> =>
        template.updateContentTemplate(client, parameters),
      getBlueprintTemplates: (parameters?: GetBlueprintTemplates): Promise<BlueprintTemplateArray> =>
        template.getBlueprintTemplates(client, parameters),
      getContentTemplates: (parameters?: GetContentTemplates): Promise<ContentTemplateArray> =>
        template.getContentTemplates(client, parameters),
      getContentTemplate: (parameters: GetContentTemplate): Promise<ContentTemplate> =>
        template.getContentTemplate(client, parameters),
      removeTemplate: (parameters: RemoveTemplate): Promise<void> => template.removeTemplate(client, parameters),
    },
    users: {
      getUser: (parameters: GetUser): Promise<User> => users.getUser(client, parameters),
      getAnonymousUser: (parameters?: GetAnonymousUser): Promise<UserAnonymous> =>
        users.getAnonymousUser(client, parameters),
      getCurrentUser: (parameters?: GetCurrentUser): Promise<User> => users.getCurrentUser(client, parameters),
      getGroupMembershipsForUser: (parameters: GetGroupMembershipsForUser): Promise<GroupArrayWithLinks> =>
        users.getGroupMembershipsForUser(client, parameters),
      getBulkUserLookup: (parameters: GetBulkUserLookup): Promise<BulkUserLookupArray> =>
        users.getBulkUserLookup(client, parameters),
      getPrivacyUnsafeUserEmail: (parameters: GetPrivacyUnsafeUserEmail): Promise<AccountIdEmailRecord> =>
        users.getPrivacyUnsafeUserEmail(client, parameters),
      getPrivacyUnsafeUserEmailBulk: (parameters: GetPrivacyUnsafeUserEmailBulk): Promise<AccountIdEmailRecordArray> =>
        users.getPrivacyUnsafeUserEmailBulk(client, parameters),
    },
    dynamicModules: {
      getModules: (): Promise<unknown> => dynamicModules.getModules(client),
      registerModules: (parameters: RegisterModules): Promise<void> =>
        dynamicModules.registerModules(client, parameters),
      removeModules: (parameters: RemoveModules): Promise<void> => dynamicModules.removeModules(client, parameters),
    },
    analytics: {
      getViews: (parameters: GetViews): Promise<GetViewsModel> => analytics.getViews(client, parameters),
      getViewers: (parameters: GetViewers): Promise<GetViewersModel> => analytics.getViewers(client, parameters),
    },
    userProperties: {
      getUserProperties: (parameters: GetUserProperties): Promise<UserPropertyKeyArray> =>
        userProperties.getUserProperties(client, parameters),
      getUserProperty: (parameters: GetUserProperty): Promise<UserProperty> =>
        userProperties.getUserProperty(client, parameters),
      createUserProperty: (parameters: CreateUserProperty): Promise<void> =>
        userProperties.createUserProperty(client, parameters),
      updateUserProperty: (parameters: UpdateUserProperty): Promise<void> =>
        userProperties.updateUserProperty(client, parameters),
      deleteUserProperty: (parameters: DeleteUserProperty): Promise<void> =>
        userProperties.deleteUserProperty(client, parameters),
    },
  };
}
export type V1Client = ReturnType<typeof createV1Client>;
