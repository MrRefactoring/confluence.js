import { type ClientConfig, type Client, createClient, type Buffer } from '#/core';
import * as adminKey from './api/adminKey';
import * as attachment from './api/attachment';
import * as label from './api/label';
import * as operation from './api/operation';
import * as version from './api/version';
import * as comment from './api/comment';
import * as blogPost from './api/blogPost';
import * as customContent from './api/customContent';
import * as like from './api/like';
import * as content from './api/content';
import * as page from './api/page';
import * as redactions from './api/redactions';
import * as whiteboard from './api/whiteboard';
import * as contentProperties from './api/contentProperties';
import * as children from './api/children';
import * as descendants from './api/descendants';
import * as ancestors from './api/ancestors';
import * as database from './api/database';
import * as smartLink from './api/smartLink';
import * as folder from './api/folder';
import * as space from './api/space';
import * as spacePermissions from './api/spacePermissions';
import * as spacePermissionTransition from './api/spacePermissionTransition';
import * as spaceRoles from './api/spaceRoles';
import * as task from './api/task';
import * as user from './api/user';
import * as dataPolicies from './api/dataPolicies';
import * as classificationLevel from './api/classificationLevel';
import * as appProperties from './api/appProperties';
import * as spaceProperties from './api/spaceProperties';
import type {
  EnableAdminKey,
  GetAttachments,
  GetAttachmentById,
  DeleteAttachment,
  GetBlogpostAttachments,
  GetCustomContentAttachments,
  GetLabelAttachments,
  GetPageAttachments,
  GetAttachmentThumbnailById,
  GetAttachmentLabels,
  GetBlogPostLabels,
  GetCustomContentLabels,
  GetLabels,
  GetPageLabels,
  GetSpaceLabels,
  GetSpaceContentLabels,
  GetAttachmentOperations,
  GetBlogPostOperations,
  GetCustomContentOperations,
  GetPageOperations,
  GetWhiteboardOperations,
  GetDatabaseOperations,
  GetSmartLinkOperations,
  GetFolderOperations,
  GetSpaceOperations,
  GetFooterCommentOperations,
  GetInlineCommentOperations,
  GetAttachmentVersions,
  GetBlogPostVersions,
  GetPageVersions,
  GetFooterCommentVersions,
  GetInlineCommentVersions,
  GetAttachmentVersionDetails,
  GetBlogPostVersionDetails,
  GetPageVersionDetails,
  GetCustomContentVersions,
  GetCustomContentVersionDetails,
  GetFooterCommentVersionDetails,
  GetInlineCommentVersionDetails,
  GetAttachmentComments,
  GetCustomContentComments,
  GetPageFooterComments,
  GetPageInlineComments,
  GetBlogPostFooterComments,
  GetBlogPostInlineComments,
  GetFooterComments,
  CreateFooterComment,
  GetFooterCommentChildren,
  GetInlineComments,
  CreateInlineComment,
  GetInlineCommentChildren,
  GetFooterCommentById,
  UpdateFooterComment,
  DeleteFooterComment,
  GetInlineCommentById,
  UpdateInlineComment,
  DeleteInlineComment,
  GetBlogPosts,
  CreateBlogPost,
  GetBlogPostById,
  UpdateBlogPost,
  DeleteBlogPost,
  GetLabelBlogPosts,
  GetBlogPostsInSpace,
  GetCustomContentByTypeInBlogPost,
  GetCustomContentByType,
  CreateCustomContent,
  GetCustomContentById,
  UpdateCustomContent,
  DeleteCustomContent,
  GetCustomContentByTypeInPage,
  GetCustomContentByTypeInSpace,
  GetBlogPostLikeCount,
  GetBlogPostLikeUsers,
  GetPageLikeCount,
  GetPageLikeUsers,
  GetFooterLikeCount,
  GetFooterLikeUsers,
  GetInlineLikeCount,
  GetInlineLikeUsers,
  ConvertContentIdsToContentTypes,
  GetLabelPages,
  GetPages,
  CreatePage,
  GetPageById,
  UpdatePage,
  DeletePage,
  UpdatePageTitle,
  GetPagesInSpace,
  PostRedactPage,
  PostRedactBlog,
  CreateWhiteboard,
  GetWhiteboardById,
  DeleteWhiteboard,
  GetWhiteboardContentProperties,
  CreateWhiteboardProperty,
  GetDatabaseContentProperties,
  CreateDatabaseProperty,
  GetSmartLinkContentProperties,
  CreateSmartLinkProperty,
  GetFolderContentProperties,
  CreateFolderProperty,
  GetAttachmentContentProperties,
  CreateAttachmentProperty,
  GetAttachmentContentPropertiesById,
  UpdateAttachmentPropertyById,
  DeleteAttachmentPropertyById,
  GetBlogpostContentProperties,
  CreateBlogpostProperty,
  GetBlogpostContentPropertiesById,
  UpdateBlogpostPropertyById,
  DeleteBlogpostPropertyById,
  GetCustomContentContentProperties,
  CreateCustomContentProperty,
  GetCustomContentContentPropertiesById,
  UpdateCustomContentPropertyById,
  DeleteCustomContentPropertyById,
  GetPageContentProperties,
  CreatePageProperty,
  GetPageContentPropertiesById,
  UpdatePagePropertyById,
  DeletePagePropertyById,
  GetWhiteboardContentPropertiesById,
  UpdateWhiteboardPropertyById,
  DeleteWhiteboardPropertyById,
  GetDatabaseContentPropertiesById,
  UpdateDatabasePropertyById,
  DeleteDatabasePropertyById,
  GetSmartLinkContentPropertiesById,
  UpdateSmartLinkPropertyById,
  DeleteSmartLinkPropertyById,
  GetFolderContentPropertiesById,
  UpdateFolderPropertyById,
  DeleteFolderPropertyById,
  GetCommentContentProperties,
  CreateCommentProperty,
  GetCommentContentPropertiesById,
  UpdateCommentPropertyById,
  DeleteCommentPropertyById,
  GetWhiteboardDirectChildren,
  GetDatabaseDirectChildren,
  GetSmartLinkDirectChildren,
  GetFolderDirectChildren,
  GetChildPages,
  GetChildCustomContent,
  GetPageDirectChildren,
  GetWhiteboardDescendants,
  GetDatabaseDescendants,
  GetSmartLinkDescendants,
  GetFolderDescendants,
  GetPageDescendants,
  GetWhiteboardAncestors,
  GetDatabaseAncestors,
  GetSmartLinkAncestors,
  GetFolderAncestors,
  GetPageAncestors,
  CreateDatabase,
  GetDatabaseById,
  DeleteDatabase,
  CreateSmartLink,
  GetSmartLinkById,
  DeleteSmartLink,
  CreateFolder,
  GetFolderById,
  DeleteFolder,
  GetSpaces,
  CreateSpace,
  GetSpaceById,
  GetSpacePermissionsAssignments,
  GetAvailableSpacePermissions,
  ListSpacePermissionCombinations,
  BulkAssignSpacePermissionRoles,
  BulkRemoveSpacePermissionAccess,
  GetSpacePermissionTransitionTaskStatus,
  GetAvailableSpaceRoles,
  CreateSpaceRole,
  GetSpaceRolesById,
  UpdateSpaceRole,
  DeleteSpaceRole,
  GetSpaceRoleAssignments,
  SetSpaceRoleAssignments,
  GetTasks,
  GetTaskById,
  UpdateTask,
  CreateBulkUserLookup,
  CheckAccessByEmail,
  InviteByEmail,
  GetDataPolicySpaces,
  GetSpaceDefaultClassificationLevel,
  PutSpaceDefaultClassificationLevel,
  DeleteSpaceDefaultClassificationLevel,
  GetPageClassificationLevel,
  PutPageClassificationLevel,
  PostPageClassificationLevel,
  GetBlogPostClassificationLevel,
  PutBlogPostClassificationLevel,
  PostBlogPostClassificationLevel,
  GetWhiteboardClassificationLevel,
  PutWhiteboardClassificationLevel,
  PostWhiteboardClassificationLevel,
  GetDatabaseClassificationLevel,
  PutDatabaseClassificationLevel,
  PostDatabaseClassificationLevel,
  GetForgeAppProperties,
  GetForgeAppProperty,
  PutForgeAppProperty,
  DeleteForgeAppProperty,
  GetSpaceProperties,
  CreateSpaceProperty,
  GetSpacePropertyById,
  UpdateSpacePropertyById,
  DeleteSpacePropertyById,
} from './parameters';
import type {
  AdminKey,
  Attachments,
  Attachment,
  BlogpostAttachments,
  CustomContentAttachments,
  LabelAttachments,
  PageAttachments,
  AttachmentLabels,
  BlogPostLabels,
  CustomContentLabels,
  Labels,
  PageLabels,
  SpaceLabels,
  SpaceContentLabels,
  PermittedOperations,
  AttachmentVersions,
  BlogPostVersions,
  PageVersions,
  FooterCommentVersions,
  InlineCommentVersions,
  DetailedVersion,
  CustomContentVersions,
  AttachmentComments,
  CustomContentComments,
  PageFooterComments,
  PageInlineComments,
  BlogPostFooterComments,
  BlogPostInlineComments,
  FooterComments,
  FooterComment,
  FooterCommentChildren,
  InlineComments,
  InlineComment,
  InlineCommentChildrenGet,
  BlogPosts,
  BlogPost,
  LabelBlogPosts,
  BlogPostsInSpace,
  CustomContentByTypeInBlogPost,
  CustomContentByType,
  CustomContent,
  CustomContentByTypeInPage,
  CustomContentByTypeInSpace,
  BlogPostLikeCount,
  BlogPostLikeUsers,
  PageLikeCount,
  PageLikeUsers,
  FooterLikeCount,
  FooterLikeUsers,
  InlineLikeCount,
  InlineLikeUsers,
  ContentIdToContentType,
  LabelPages,
  Pages,
  Page,
  PagesInSpace,
  RedactionResponse,
  Whiteboard,
  WhiteboardContentProperties,
  ContentProperty,
  DatabaseContentProperties,
  SmartLinkContentProperties,
  FolderContentProperties,
  AttachmentContentProperties,
  BlogpostContentProperties,
  CustomContentContentProperties,
  PageContentProperties,
  CommentContentProperties,
  WhiteboardDirectChildren,
  DatabaseDirectChildren,
  SmartLinkDirectChildren,
  FolderDirectChildren,
  ChildPages,
  ChildCustomContentGet,
  PageDirectChildren,
  WhiteboardDescendants,
  DatabaseDescendants,
  SmartLinkDescendants,
  FolderDescendants,
  PageDescendants,
  WhiteboardAncestors,
  DatabaseAncestors,
  SmartLinkAncestors,
  FolderAncestors,
  PageAncestors,
  Database,
  SmartLink,
  Folder,
  Spaces,
  SpaceSummary,
  Space,
  SpacePermissionsAssignments,
  AvailableSpacePermissions,
  ListSpacePermissionCombinationsResponse,
  BulkTransitionTask,
  BulkTransitionTaskStatus,
  AvailableSpaceRoles,
  SpaceRole,
  UpdateSpaceRoleResponse,
  DeleteSpaceRoleResponse,
  SpaceRoleMode,
  SpaceRoleAssignmentsGet,
  SpaceRoleAssignmentsSet,
  Tasks,
  Task,
  BulkUserLookup,
  AccessByEmail,
  DataPolicyMetadata,
  DataPolicySpaces,
  ClassificationLevel,
  ForgeAppProperties,
  ForgeAppProperty,
  SpaceProperties,
  SpaceProperty,
} from './models';
export function createV2Client(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);
  return {
    adminKey: {
      getAdminKey: (): Promise<AdminKey> => adminKey.getAdminKey(client),
      enableAdminKey: (parameters: EnableAdminKey): Promise<AdminKey> => adminKey.enableAdminKey(client, parameters),
      disableAdminKey: (): Promise<void> => adminKey.disableAdminKey(client),
    },
    attachment: {
      getAttachments: (parameters?: GetAttachments): Promise<Attachments> =>
        attachment.getAttachments(client, parameters),
      getAttachmentById: (parameters: GetAttachmentById): Promise<Attachment> =>
        attachment.getAttachmentById(client, parameters),
      deleteAttachment: (parameters: DeleteAttachment): Promise<void> =>
        attachment.deleteAttachment(client, parameters),
      getBlogpostAttachments: (parameters: GetBlogpostAttachments): Promise<BlogpostAttachments> =>
        attachment.getBlogpostAttachments(client, parameters),
      getCustomContentAttachments: (parameters: GetCustomContentAttachments): Promise<CustomContentAttachments> =>
        attachment.getCustomContentAttachments(client, parameters),
      getLabelAttachments: (parameters: GetLabelAttachments): Promise<LabelAttachments> =>
        attachment.getLabelAttachments(client, parameters),
      getPageAttachments: (parameters: GetPageAttachments): Promise<PageAttachments> =>
        attachment.getPageAttachments(client, parameters),
      getAttachmentThumbnailById: (parameters: GetAttachmentThumbnailById): Promise<Buffer> =>
        attachment.getAttachmentThumbnailById(client, parameters),
    },
    label: {
      getAttachmentLabels: (parameters: GetAttachmentLabels): Promise<AttachmentLabels> =>
        label.getAttachmentLabels(client, parameters),
      getBlogPostLabels: (parameters: GetBlogPostLabels): Promise<BlogPostLabels> =>
        label.getBlogPostLabels(client, parameters),
      getCustomContentLabels: (parameters: GetCustomContentLabels): Promise<CustomContentLabels> =>
        label.getCustomContentLabels(client, parameters),
      getLabels: (parameters?: GetLabels): Promise<Labels> => label.getLabels(client, parameters),
      getPageLabels: (parameters: GetPageLabels): Promise<PageLabels> => label.getPageLabels(client, parameters),
      getSpaceLabels: (parameters: GetSpaceLabels): Promise<SpaceLabels> => label.getSpaceLabels(client, parameters),
      getSpaceContentLabels: (parameters: GetSpaceContentLabels): Promise<SpaceContentLabels> =>
        label.getSpaceContentLabels(client, parameters),
    },
    operation: {
      getAttachmentOperations: (parameters: GetAttachmentOperations): Promise<PermittedOperations> =>
        operation.getAttachmentOperations(client, parameters),
      getBlogPostOperations: (parameters: GetBlogPostOperations): Promise<PermittedOperations> =>
        operation.getBlogPostOperations(client, parameters),
      getCustomContentOperations: (parameters: GetCustomContentOperations): Promise<PermittedOperations> =>
        operation.getCustomContentOperations(client, parameters),
      getPageOperations: (parameters: GetPageOperations): Promise<PermittedOperations> =>
        operation.getPageOperations(client, parameters),
      getWhiteboardOperations: (parameters: GetWhiteboardOperations): Promise<PermittedOperations> =>
        operation.getWhiteboardOperations(client, parameters),
      getDatabaseOperations: (parameters: GetDatabaseOperations): Promise<PermittedOperations> =>
        operation.getDatabaseOperations(client, parameters),
      getSmartLinkOperations: (parameters: GetSmartLinkOperations): Promise<PermittedOperations> =>
        operation.getSmartLinkOperations(client, parameters),
      getFolderOperations: (parameters: GetFolderOperations): Promise<PermittedOperations> =>
        operation.getFolderOperations(client, parameters),
      getSpaceOperations: (parameters: GetSpaceOperations): Promise<PermittedOperations> =>
        operation.getSpaceOperations(client, parameters),
      getFooterCommentOperations: (parameters: GetFooterCommentOperations): Promise<PermittedOperations> =>
        operation.getFooterCommentOperations(client, parameters),
      getInlineCommentOperations: (parameters: GetInlineCommentOperations): Promise<PermittedOperations> =>
        operation.getInlineCommentOperations(client, parameters),
    },
    version: {
      getAttachmentVersions: (parameters: GetAttachmentVersions): Promise<AttachmentVersions> =>
        version.getAttachmentVersions(client, parameters),
      getBlogPostVersions: (parameters: GetBlogPostVersions): Promise<BlogPostVersions> =>
        version.getBlogPostVersions(client, parameters),
      getPageVersions: (parameters: GetPageVersions): Promise<PageVersions> =>
        version.getPageVersions(client, parameters),
      getFooterCommentVersions: (parameters: GetFooterCommentVersions): Promise<FooterCommentVersions> =>
        version.getFooterCommentVersions(client, parameters),
      getInlineCommentVersions: (parameters: GetInlineCommentVersions): Promise<InlineCommentVersions> =>
        version.getInlineCommentVersions(client, parameters),
      getAttachmentVersionDetails: (parameters: GetAttachmentVersionDetails): Promise<DetailedVersion> =>
        version.getAttachmentVersionDetails(client, parameters),
      getBlogPostVersionDetails: (parameters: GetBlogPostVersionDetails): Promise<DetailedVersion> =>
        version.getBlogPostVersionDetails(client, parameters),
      getPageVersionDetails: (parameters: GetPageVersionDetails): Promise<DetailedVersion> =>
        version.getPageVersionDetails(client, parameters),
      getCustomContentVersions: (parameters: GetCustomContentVersions): Promise<CustomContentVersions> =>
        version.getCustomContentVersions(client, parameters),
      getCustomContentVersionDetails: (parameters: GetCustomContentVersionDetails): Promise<DetailedVersion> =>
        version.getCustomContentVersionDetails(client, parameters),
      getFooterCommentVersionDetails: (parameters: GetFooterCommentVersionDetails): Promise<DetailedVersion> =>
        version.getFooterCommentVersionDetails(client, parameters),
      getInlineCommentVersionDetails: (parameters: GetInlineCommentVersionDetails): Promise<DetailedVersion> =>
        version.getInlineCommentVersionDetails(client, parameters),
    },
    comment: {
      getAttachmentComments: (parameters: GetAttachmentComments): Promise<AttachmentComments> =>
        comment.getAttachmentComments(client, parameters),
      getCustomContentComments: (parameters: GetCustomContentComments): Promise<CustomContentComments> =>
        comment.getCustomContentComments(client, parameters),
      getPageFooterComments: (parameters: GetPageFooterComments): Promise<PageFooterComments> =>
        comment.getPageFooterComments(client, parameters),
      getPageInlineComments: (parameters: GetPageInlineComments): Promise<PageInlineComments> =>
        comment.getPageInlineComments(client, parameters),
      getBlogPostFooterComments: (parameters: GetBlogPostFooterComments): Promise<BlogPostFooterComments> =>
        comment.getBlogPostFooterComments(client, parameters),
      getBlogPostInlineComments: (parameters: GetBlogPostInlineComments): Promise<BlogPostInlineComments> =>
        comment.getBlogPostInlineComments(client, parameters),
      getFooterComments: (parameters?: GetFooterComments): Promise<FooterComments> =>
        comment.getFooterComments(client, parameters),
      createFooterComment: (parameters: CreateFooterComment): Promise<FooterComment> =>
        comment.createFooterComment(client, parameters),
      getFooterCommentChildren: (parameters: GetFooterCommentChildren): Promise<FooterCommentChildren> =>
        comment.getFooterCommentChildren(client, parameters),
      getInlineComments: (parameters?: GetInlineComments): Promise<InlineComments> =>
        comment.getInlineComments(client, parameters),
      createInlineComment: (parameters: CreateInlineComment): Promise<InlineComment> =>
        comment.createInlineComment(client, parameters),
      getInlineCommentChildren: (parameters: GetInlineCommentChildren): Promise<InlineCommentChildrenGet> =>
        comment.getInlineCommentChildren(client, parameters),
      getFooterCommentById: (parameters: GetFooterCommentById): Promise<FooterComment> =>
        comment.getFooterCommentById(client, parameters),
      updateFooterComment: (parameters: UpdateFooterComment): Promise<FooterComment> =>
        comment.updateFooterComment(client, parameters),
      deleteFooterComment: (parameters: DeleteFooterComment): Promise<void> =>
        comment.deleteFooterComment(client, parameters),
      getInlineCommentById: (parameters: GetInlineCommentById): Promise<InlineComment> =>
        comment.getInlineCommentById(client, parameters),
      updateInlineComment: (parameters: UpdateInlineComment): Promise<InlineComment> =>
        comment.updateInlineComment(client, parameters),
      deleteInlineComment: (parameters: DeleteInlineComment): Promise<void> =>
        comment.deleteInlineComment(client, parameters),
    },
    blogPost: {
      getBlogPosts: (parameters?: GetBlogPosts): Promise<BlogPosts> => blogPost.getBlogPosts(client, parameters),
      createBlogPost: (parameters: CreateBlogPost): Promise<BlogPost> => blogPost.createBlogPost(client, parameters),
      getBlogPostById: (parameters: GetBlogPostById): Promise<BlogPost> => blogPost.getBlogPostById(client, parameters),
      updateBlogPost: (parameters: UpdateBlogPost): Promise<BlogPost> => blogPost.updateBlogPost(client, parameters),
      deleteBlogPost: (parameters: DeleteBlogPost): Promise<void> => blogPost.deleteBlogPost(client, parameters),
      getLabelBlogPosts: (parameters: GetLabelBlogPosts): Promise<LabelBlogPosts> =>
        blogPost.getLabelBlogPosts(client, parameters),
      getBlogPostsInSpace: (parameters: GetBlogPostsInSpace): Promise<BlogPostsInSpace> =>
        blogPost.getBlogPostsInSpace(client, parameters),
    },
    customContent: {
      getCustomContentByTypeInBlogPost: (
        parameters: GetCustomContentByTypeInBlogPost,
      ): Promise<CustomContentByTypeInBlogPost> => customContent.getCustomContentByTypeInBlogPost(client, parameters),
      getCustomContentByType: (parameters: GetCustomContentByType): Promise<CustomContentByType> =>
        customContent.getCustomContentByType(client, parameters),
      createCustomContent: (parameters: CreateCustomContent): Promise<CustomContent> =>
        customContent.createCustomContent(client, parameters),
      getCustomContentById: (parameters: GetCustomContentById): Promise<CustomContent> =>
        customContent.getCustomContentById(client, parameters),
      updateCustomContent: (parameters: UpdateCustomContent): Promise<CustomContent> =>
        customContent.updateCustomContent(client, parameters),
      deleteCustomContent: (parameters: DeleteCustomContent): Promise<void> =>
        customContent.deleteCustomContent(client, parameters),
      getCustomContentByTypeInPage: (parameters: GetCustomContentByTypeInPage): Promise<CustomContentByTypeInPage> =>
        customContent.getCustomContentByTypeInPage(client, parameters),
      getCustomContentByTypeInSpace: (parameters: GetCustomContentByTypeInSpace): Promise<CustomContentByTypeInSpace> =>
        customContent.getCustomContentByTypeInSpace(client, parameters),
    },
    like: {
      getBlogPostLikeCount: (parameters: GetBlogPostLikeCount): Promise<BlogPostLikeCount> =>
        like.getBlogPostLikeCount(client, parameters),
      getBlogPostLikeUsers: (parameters: GetBlogPostLikeUsers): Promise<BlogPostLikeUsers> =>
        like.getBlogPostLikeUsers(client, parameters),
      getPageLikeCount: (parameters: GetPageLikeCount): Promise<PageLikeCount> =>
        like.getPageLikeCount(client, parameters),
      getPageLikeUsers: (parameters: GetPageLikeUsers): Promise<PageLikeUsers> =>
        like.getPageLikeUsers(client, parameters),
      getFooterLikeCount: (parameters: GetFooterLikeCount): Promise<FooterLikeCount> =>
        like.getFooterLikeCount(client, parameters),
      getFooterLikeUsers: (parameters: GetFooterLikeUsers): Promise<FooterLikeUsers> =>
        like.getFooterLikeUsers(client, parameters),
      getInlineLikeCount: (parameters: GetInlineLikeCount): Promise<InlineLikeCount> =>
        like.getInlineLikeCount(client, parameters),
      getInlineLikeUsers: (parameters: GetInlineLikeUsers): Promise<InlineLikeUsers> =>
        like.getInlineLikeUsers(client, parameters),
    },
    content: {
      convertContentIdsToContentTypes: (parameters: ConvertContentIdsToContentTypes): Promise<ContentIdToContentType> =>
        content.convertContentIdsToContentTypes(client, parameters),
    },
    page: {
      getLabelPages: (parameters: GetLabelPages): Promise<LabelPages> => page.getLabelPages(client, parameters),
      getPages: (parameters?: GetPages): Promise<Pages> => page.getPages(client, parameters),
      createPage: (parameters: CreatePage): Promise<Page> => page.createPage(client, parameters),
      getPageById: (parameters: GetPageById): Promise<Page> => page.getPageById(client, parameters),
      updatePage: (parameters: UpdatePage): Promise<Page> => page.updatePage(client, parameters),
      deletePage: (parameters: DeletePage): Promise<void> => page.deletePage(client, parameters),
      updatePageTitle: (parameters: UpdatePageTitle): Promise<Page> => page.updatePageTitle(client, parameters),
      getPagesInSpace: (parameters: GetPagesInSpace): Promise<PagesInSpace> => page.getPagesInSpace(client, parameters),
    },
    redactions: {
      postRedactPage: (parameters: PostRedactPage): Promise<RedactionResponse> =>
        redactions.postRedactPage(client, parameters),
      postRedactBlog: (parameters: PostRedactBlog): Promise<RedactionResponse> =>
        redactions.postRedactBlog(client, parameters),
    },
    whiteboard: {
      createWhiteboard: (parameters: CreateWhiteboard): Promise<Whiteboard> =>
        whiteboard.createWhiteboard(client, parameters),
      getWhiteboardById: (parameters: GetWhiteboardById): Promise<Whiteboard> =>
        whiteboard.getWhiteboardById(client, parameters),
      deleteWhiteboard: (parameters: DeleteWhiteboard): Promise<void> =>
        whiteboard.deleteWhiteboard(client, parameters),
    },
    contentProperties: {
      getWhiteboardContentProperties: (
        parameters: GetWhiteboardContentProperties,
      ): Promise<WhiteboardContentProperties> => contentProperties.getWhiteboardContentProperties(client, parameters),
      createWhiteboardProperty: (parameters: CreateWhiteboardProperty): Promise<ContentProperty> =>
        contentProperties.createWhiteboardProperty(client, parameters),
      getDatabaseContentProperties: (parameters: GetDatabaseContentProperties): Promise<DatabaseContentProperties> =>
        contentProperties.getDatabaseContentProperties(client, parameters),
      createDatabaseProperty: (parameters: CreateDatabaseProperty): Promise<ContentProperty> =>
        contentProperties.createDatabaseProperty(client, parameters),
      getSmartLinkContentProperties: (parameters: GetSmartLinkContentProperties): Promise<SmartLinkContentProperties> =>
        contentProperties.getSmartLinkContentProperties(client, parameters),
      createSmartLinkProperty: (parameters: CreateSmartLinkProperty): Promise<ContentProperty> =>
        contentProperties.createSmartLinkProperty(client, parameters),
      getFolderContentProperties: (parameters: GetFolderContentProperties): Promise<FolderContentProperties> =>
        contentProperties.getFolderContentProperties(client, parameters),
      createFolderProperty: (parameters: CreateFolderProperty): Promise<ContentProperty> =>
        contentProperties.createFolderProperty(client, parameters),
      getAttachmentContentProperties: (
        parameters: GetAttachmentContentProperties,
      ): Promise<AttachmentContentProperties> => contentProperties.getAttachmentContentProperties(client, parameters),
      createAttachmentProperty: (parameters: CreateAttachmentProperty): Promise<ContentProperty> =>
        contentProperties.createAttachmentProperty(client, parameters),
      getAttachmentContentPropertiesById: (parameters: GetAttachmentContentPropertiesById): Promise<ContentProperty> =>
        contentProperties.getAttachmentContentPropertiesById(client, parameters),
      updateAttachmentPropertyById: (parameters: UpdateAttachmentPropertyById): Promise<ContentProperty> =>
        contentProperties.updateAttachmentPropertyById(client, parameters),
      deleteAttachmentPropertyById: (parameters: DeleteAttachmentPropertyById): Promise<void> =>
        contentProperties.deleteAttachmentPropertyById(client, parameters),
      getBlogpostContentProperties: (parameters: GetBlogpostContentProperties): Promise<BlogpostContentProperties> =>
        contentProperties.getBlogpostContentProperties(client, parameters),
      createBlogpostProperty: (parameters: CreateBlogpostProperty): Promise<ContentProperty> =>
        contentProperties.createBlogpostProperty(client, parameters),
      getBlogpostContentPropertiesById: (parameters: GetBlogpostContentPropertiesById): Promise<ContentProperty> =>
        contentProperties.getBlogpostContentPropertiesById(client, parameters),
      updateBlogpostPropertyById: (parameters: UpdateBlogpostPropertyById): Promise<ContentProperty> =>
        contentProperties.updateBlogpostPropertyById(client, parameters),
      deleteBlogpostPropertyById: (parameters: DeleteBlogpostPropertyById): Promise<void> =>
        contentProperties.deleteBlogpostPropertyById(client, parameters),
      getCustomContentContentProperties: (
        parameters: GetCustomContentContentProperties,
      ): Promise<CustomContentContentProperties> =>
        contentProperties.getCustomContentContentProperties(client, parameters),
      createCustomContentProperty: (parameters: CreateCustomContentProperty): Promise<ContentProperty> =>
        contentProperties.createCustomContentProperty(client, parameters),
      getCustomContentContentPropertiesById: (
        parameters: GetCustomContentContentPropertiesById,
      ): Promise<ContentProperty> => contentProperties.getCustomContentContentPropertiesById(client, parameters),
      updateCustomContentPropertyById: (parameters: UpdateCustomContentPropertyById): Promise<ContentProperty> =>
        contentProperties.updateCustomContentPropertyById(client, parameters),
      deleteCustomContentPropertyById: (parameters: DeleteCustomContentPropertyById): Promise<void> =>
        contentProperties.deleteCustomContentPropertyById(client, parameters),
      getPageContentProperties: (parameters: GetPageContentProperties): Promise<PageContentProperties> =>
        contentProperties.getPageContentProperties(client, parameters),
      createPageProperty: (parameters: CreatePageProperty): Promise<ContentProperty> =>
        contentProperties.createPageProperty(client, parameters),
      getPageContentPropertiesById: (parameters: GetPageContentPropertiesById): Promise<ContentProperty> =>
        contentProperties.getPageContentPropertiesById(client, parameters),
      updatePagePropertyById: (parameters: UpdatePagePropertyById): Promise<ContentProperty> =>
        contentProperties.updatePagePropertyById(client, parameters),
      deletePagePropertyById: (parameters: DeletePagePropertyById): Promise<void> =>
        contentProperties.deletePagePropertyById(client, parameters),
      getWhiteboardContentPropertiesById: (parameters: GetWhiteboardContentPropertiesById): Promise<ContentProperty> =>
        contentProperties.getWhiteboardContentPropertiesById(client, parameters),
      updateWhiteboardPropertyById: (parameters: UpdateWhiteboardPropertyById): Promise<ContentProperty> =>
        contentProperties.updateWhiteboardPropertyById(client, parameters),
      deleteWhiteboardPropertyById: (parameters: DeleteWhiteboardPropertyById): Promise<void> =>
        contentProperties.deleteWhiteboardPropertyById(client, parameters),
      getDatabaseContentPropertiesById: (parameters: GetDatabaseContentPropertiesById): Promise<ContentProperty> =>
        contentProperties.getDatabaseContentPropertiesById(client, parameters),
      updateDatabasePropertyById: (parameters: UpdateDatabasePropertyById): Promise<ContentProperty> =>
        contentProperties.updateDatabasePropertyById(client, parameters),
      deleteDatabasePropertyById: (parameters: DeleteDatabasePropertyById): Promise<void> =>
        contentProperties.deleteDatabasePropertyById(client, parameters),
      getSmartLinkContentPropertiesById: (parameters: GetSmartLinkContentPropertiesById): Promise<ContentProperty> =>
        contentProperties.getSmartLinkContentPropertiesById(client, parameters),
      updateSmartLinkPropertyById: (parameters: UpdateSmartLinkPropertyById): Promise<ContentProperty> =>
        contentProperties.updateSmartLinkPropertyById(client, parameters),
      deleteSmartLinkPropertyById: (parameters: DeleteSmartLinkPropertyById): Promise<void> =>
        contentProperties.deleteSmartLinkPropertyById(client, parameters),
      getFolderContentPropertiesById: (parameters: GetFolderContentPropertiesById): Promise<ContentProperty> =>
        contentProperties.getFolderContentPropertiesById(client, parameters),
      updateFolderPropertyById: (parameters: UpdateFolderPropertyById): Promise<ContentProperty> =>
        contentProperties.updateFolderPropertyById(client, parameters),
      deleteFolderPropertyById: (parameters: DeleteFolderPropertyById): Promise<void> =>
        contentProperties.deleteFolderPropertyById(client, parameters),
      getCommentContentProperties: (parameters: GetCommentContentProperties): Promise<CommentContentProperties> =>
        contentProperties.getCommentContentProperties(client, parameters),
      createCommentProperty: (parameters: CreateCommentProperty): Promise<ContentProperty> =>
        contentProperties.createCommentProperty(client, parameters),
      getCommentContentPropertiesById: (parameters: GetCommentContentPropertiesById): Promise<ContentProperty> =>
        contentProperties.getCommentContentPropertiesById(client, parameters),
      updateCommentPropertyById: (parameters: UpdateCommentPropertyById): Promise<ContentProperty> =>
        contentProperties.updateCommentPropertyById(client, parameters),
      deleteCommentPropertyById: (parameters: DeleteCommentPropertyById): Promise<void> =>
        contentProperties.deleteCommentPropertyById(client, parameters),
    },
    children: {
      getWhiteboardDirectChildren: (parameters: GetWhiteboardDirectChildren): Promise<WhiteboardDirectChildren> =>
        children.getWhiteboardDirectChildren(client, parameters),
      getDatabaseDirectChildren: (parameters: GetDatabaseDirectChildren): Promise<DatabaseDirectChildren> =>
        children.getDatabaseDirectChildren(client, parameters),
      getSmartLinkDirectChildren: (parameters: GetSmartLinkDirectChildren): Promise<SmartLinkDirectChildren> =>
        children.getSmartLinkDirectChildren(client, parameters),
      getFolderDirectChildren: (parameters: GetFolderDirectChildren): Promise<FolderDirectChildren> =>
        children.getFolderDirectChildren(client, parameters),
      getChildPages: (parameters: GetChildPages): Promise<ChildPages> => children.getChildPages(client, parameters),
      getChildCustomContent: (parameters: GetChildCustomContent): Promise<ChildCustomContentGet> =>
        children.getChildCustomContent(client, parameters),
      getPageDirectChildren: (parameters: GetPageDirectChildren): Promise<PageDirectChildren> =>
        children.getPageDirectChildren(client, parameters),
    },
    descendants: {
      getWhiteboardDescendants: (parameters: GetWhiteboardDescendants): Promise<WhiteboardDescendants> =>
        descendants.getWhiteboardDescendants(client, parameters),
      getDatabaseDescendants: (parameters: GetDatabaseDescendants): Promise<DatabaseDescendants> =>
        descendants.getDatabaseDescendants(client, parameters),
      getSmartLinkDescendants: (parameters: GetSmartLinkDescendants): Promise<SmartLinkDescendants> =>
        descendants.getSmartLinkDescendants(client, parameters),
      getFolderDescendants: (parameters: GetFolderDescendants): Promise<FolderDescendants> =>
        descendants.getFolderDescendants(client, parameters),
      getPageDescendants: (parameters: GetPageDescendants): Promise<PageDescendants> =>
        descendants.getPageDescendants(client, parameters),
    },
    ancestors: {
      getWhiteboardAncestors: (parameters: GetWhiteboardAncestors): Promise<WhiteboardAncestors> =>
        ancestors.getWhiteboardAncestors(client, parameters),
      getDatabaseAncestors: (parameters: GetDatabaseAncestors): Promise<DatabaseAncestors> =>
        ancestors.getDatabaseAncestors(client, parameters),
      getSmartLinkAncestors: (parameters: GetSmartLinkAncestors): Promise<SmartLinkAncestors> =>
        ancestors.getSmartLinkAncestors(client, parameters),
      getFolderAncestors: (parameters: GetFolderAncestors): Promise<FolderAncestors> =>
        ancestors.getFolderAncestors(client, parameters),
      getPageAncestors: (parameters: GetPageAncestors): Promise<PageAncestors> =>
        ancestors.getPageAncestors(client, parameters),
    },
    database: {
      createDatabase: (parameters: CreateDatabase): Promise<Database> => database.createDatabase(client, parameters),
      getDatabaseById: (parameters: GetDatabaseById): Promise<Database> => database.getDatabaseById(client, parameters),
      deleteDatabase: (parameters: DeleteDatabase): Promise<void> => database.deleteDatabase(client, parameters),
    },
    smartLink: {
      createSmartLink: (parameters: CreateSmartLink): Promise<SmartLink> =>
        smartLink.createSmartLink(client, parameters),
      getSmartLinkById: (parameters: GetSmartLinkById): Promise<SmartLink> =>
        smartLink.getSmartLinkById(client, parameters),
      deleteSmartLink: (parameters: DeleteSmartLink): Promise<void> => smartLink.deleteSmartLink(client, parameters),
    },
    folder: {
      createFolder: (parameters: CreateFolder): Promise<Folder> => folder.createFolder(client, parameters),
      getFolderById: (parameters: GetFolderById): Promise<Folder> => folder.getFolderById(client, parameters),
      deleteFolder: (parameters: DeleteFolder): Promise<void> => folder.deleteFolder(client, parameters),
    },
    space: {
      getSpaces: (parameters?: GetSpaces): Promise<Spaces> => space.getSpaces(client, parameters),
      createSpace: (parameters: CreateSpace): Promise<SpaceSummary> => space.createSpace(client, parameters),
      getSpaceById: (parameters: GetSpaceById): Promise<Space> => space.getSpaceById(client, parameters),
    },
    spacePermissions: {
      getSpacePermissionsAssignments: (
        parameters: GetSpacePermissionsAssignments,
      ): Promise<SpacePermissionsAssignments> => spacePermissions.getSpacePermissionsAssignments(client, parameters),
      getAvailableSpacePermissions: (parameters?: GetAvailableSpacePermissions): Promise<AvailableSpacePermissions> =>
        spacePermissions.getAvailableSpacePermissions(client, parameters),
    },
    spacePermissionTransition: {
      listSpacePermissionCombinations: (
        parameters?: ListSpacePermissionCombinations,
      ): Promise<ListSpacePermissionCombinationsResponse> =>
        spacePermissionTransition.listSpacePermissionCombinations(client, parameters),
      generateSpacePermissionCombinations: (): Promise<BulkTransitionTask> =>
        spacePermissionTransition.generateSpacePermissionCombinations(client),
      bulkAssignSpacePermissionRoles: (parameters: BulkAssignSpacePermissionRoles): Promise<BulkTransitionTask> =>
        spacePermissionTransition.bulkAssignSpacePermissionRoles(client, parameters),
      bulkRemoveSpacePermissionAccess: (parameters: BulkRemoveSpacePermissionAccess): Promise<BulkTransitionTask> =>
        spacePermissionTransition.bulkRemoveSpacePermissionAccess(client, parameters),
      getSpacePermissionTransitionTaskStatus: (
        parameters: GetSpacePermissionTransitionTaskStatus,
      ): Promise<BulkTransitionTaskStatus> =>
        spacePermissionTransition.getSpacePermissionTransitionTaskStatus(client, parameters),
    },
    spaceRoles: {
      getAvailableSpaceRoles: (parameters?: GetAvailableSpaceRoles): Promise<AvailableSpaceRoles> =>
        spaceRoles.getAvailableSpaceRoles(client, parameters),
      createSpaceRole: (parameters: CreateSpaceRole): Promise<SpaceRole> =>
        spaceRoles.createSpaceRole(client, parameters),
      getSpaceRolesById: (parameters: GetSpaceRolesById): Promise<SpaceRole> =>
        spaceRoles.getSpaceRolesById(client, parameters),
      updateSpaceRole: (parameters: UpdateSpaceRole): Promise<UpdateSpaceRoleResponse> =>
        spaceRoles.updateSpaceRole(client, parameters),
      deleteSpaceRole: (parameters: DeleteSpaceRole): Promise<DeleteSpaceRoleResponse> =>
        spaceRoles.deleteSpaceRole(client, parameters),
      getSpaceRoleMode: (): Promise<SpaceRoleMode> => spaceRoles.getSpaceRoleMode(client),
      getSpaceRoleAssignments: (parameters: GetSpaceRoleAssignments): Promise<SpaceRoleAssignmentsGet> =>
        spaceRoles.getSpaceRoleAssignments(client, parameters),
      setSpaceRoleAssignments: (parameters: SetSpaceRoleAssignments): Promise<SpaceRoleAssignmentsSet> =>
        spaceRoles.setSpaceRoleAssignments(client, parameters),
    },
    task: {
      getTasks: (parameters?: GetTasks): Promise<Tasks> => task.getTasks(client, parameters),
      getTaskById: (parameters: GetTaskById): Promise<Task> => task.getTaskById(client, parameters),
      updateTask: (parameters: UpdateTask): Promise<Task> => task.updateTask(client, parameters),
    },
    user: {
      createBulkUserLookup: (parameters: CreateBulkUserLookup): Promise<BulkUserLookup> =>
        user.createBulkUserLookup(client, parameters),
      checkAccessByEmail: (parameters: CheckAccessByEmail): Promise<AccessByEmail> =>
        user.checkAccessByEmail(client, parameters),
      inviteByEmail: (parameters: InviteByEmail): Promise<void> => user.inviteByEmail(client, parameters),
    },
    dataPolicies: {
      getDataPolicyMetadata: (): Promise<DataPolicyMetadata> => dataPolicies.getDataPolicyMetadata(client),
      getDataPolicySpaces: (parameters?: GetDataPolicySpaces): Promise<DataPolicySpaces> =>
        dataPolicies.getDataPolicySpaces(client, parameters),
    },
    classificationLevel: {
      getClassificationLevels: (): Promise<ClassificationLevel[]> =>
        classificationLevel.getClassificationLevels(client),
      getSpaceDefaultClassificationLevel: (
        parameters: GetSpaceDefaultClassificationLevel,
      ): Promise<ClassificationLevel> => classificationLevel.getSpaceDefaultClassificationLevel(client, parameters),
      putSpaceDefaultClassificationLevel: (parameters: PutSpaceDefaultClassificationLevel): Promise<void> =>
        classificationLevel.putSpaceDefaultClassificationLevel(client, parameters),
      deleteSpaceDefaultClassificationLevel: (parameters: DeleteSpaceDefaultClassificationLevel): Promise<void> =>
        classificationLevel.deleteSpaceDefaultClassificationLevel(client, parameters),
      getPageClassificationLevel: (parameters: GetPageClassificationLevel): Promise<ClassificationLevel> =>
        classificationLevel.getPageClassificationLevel(client, parameters),
      putPageClassificationLevel: (parameters: PutPageClassificationLevel): Promise<void> =>
        classificationLevel.putPageClassificationLevel(client, parameters),
      postPageClassificationLevel: (parameters: PostPageClassificationLevel): Promise<void> =>
        classificationLevel.postPageClassificationLevel(client, parameters),
      getBlogPostClassificationLevel: (parameters: GetBlogPostClassificationLevel): Promise<ClassificationLevel> =>
        classificationLevel.getBlogPostClassificationLevel(client, parameters),
      putBlogPostClassificationLevel: (parameters: PutBlogPostClassificationLevel): Promise<void> =>
        classificationLevel.putBlogPostClassificationLevel(client, parameters),
      postBlogPostClassificationLevel: (parameters: PostBlogPostClassificationLevel): Promise<void> =>
        classificationLevel.postBlogPostClassificationLevel(client, parameters),
      getWhiteboardClassificationLevel: (parameters: GetWhiteboardClassificationLevel): Promise<ClassificationLevel> =>
        classificationLevel.getWhiteboardClassificationLevel(client, parameters),
      putWhiteboardClassificationLevel: (parameters: PutWhiteboardClassificationLevel): Promise<void> =>
        classificationLevel.putWhiteboardClassificationLevel(client, parameters),
      postWhiteboardClassificationLevel: (parameters: PostWhiteboardClassificationLevel): Promise<void> =>
        classificationLevel.postWhiteboardClassificationLevel(client, parameters),
      getDatabaseClassificationLevel: (parameters: GetDatabaseClassificationLevel): Promise<ClassificationLevel> =>
        classificationLevel.getDatabaseClassificationLevel(client, parameters),
      putDatabaseClassificationLevel: (parameters: PutDatabaseClassificationLevel): Promise<void> =>
        classificationLevel.putDatabaseClassificationLevel(client, parameters),
      postDatabaseClassificationLevel: (parameters: PostDatabaseClassificationLevel): Promise<void> =>
        classificationLevel.postDatabaseClassificationLevel(client, parameters),
    },
    appProperties: {
      getForgeAppProperties: (parameters?: GetForgeAppProperties): Promise<ForgeAppProperties> =>
        appProperties.getForgeAppProperties(client, parameters),
      getForgeAppProperty: (parameters: GetForgeAppProperty): Promise<ForgeAppProperty> =>
        appProperties.getForgeAppProperty(client, parameters),
      putForgeAppProperty: (parameters: PutForgeAppProperty): Promise<void> =>
        appProperties.putForgeAppProperty(client, parameters),
      deleteForgeAppProperty: (parameters: DeleteForgeAppProperty): Promise<void> =>
        appProperties.deleteForgeAppProperty(client, parameters),
    },
    spaceProperties: {
      getSpaceProperties: (parameters: GetSpaceProperties): Promise<SpaceProperties> =>
        spaceProperties.getSpaceProperties(client, parameters),
      createSpaceProperty: (parameters: CreateSpaceProperty): Promise<SpaceProperty> =>
        spaceProperties.createSpaceProperty(client, parameters),
      getSpacePropertyById: (parameters: GetSpacePropertyById): Promise<SpaceProperty> =>
        spaceProperties.getSpacePropertyById(client, parameters),
      updateSpacePropertyById: (parameters: UpdateSpacePropertyById): Promise<SpaceProperty> =>
        spaceProperties.updateSpacePropertyById(client, parameters),
      deleteSpacePropertyById: (parameters: DeleteSpacePropertyById): Promise<void> =>
        spaceProperties.deleteSpacePropertyById(client, parameters),
    },
  };
}
export type V2Client = ReturnType<typeof createV2Client>;
