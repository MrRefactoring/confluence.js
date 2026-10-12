import { type ClientConfig, type Client, type RequestOptions, createClient, type Buffer } from '#/core';
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
      getAdminKey: (options?: RequestOptions): Promise<AdminKey> => adminKey.getAdminKey(client, options),
      enableAdminKey: (parameters: EnableAdminKey, options?: RequestOptions): Promise<AdminKey> =>
        adminKey.enableAdminKey(client, parameters, options),
      disableAdminKey: (options?: RequestOptions): Promise<void> => adminKey.disableAdminKey(client, options),
    },
    attachment: {
      getAttachments: (parameters?: GetAttachments, options?: RequestOptions): Promise<Attachments> =>
        attachment.getAttachments(client, parameters, options),
      getAttachmentById: (parameters: GetAttachmentById, options?: RequestOptions): Promise<Attachment> =>
        attachment.getAttachmentById(client, parameters, options),
      deleteAttachment: (parameters: DeleteAttachment, options?: RequestOptions): Promise<void> =>
        attachment.deleteAttachment(client, parameters, options),
      getBlogpostAttachments: (
        parameters: GetBlogpostAttachments,
        options?: RequestOptions,
      ): Promise<BlogpostAttachments> => attachment.getBlogpostAttachments(client, parameters, options),
      getCustomContentAttachments: (
        parameters: GetCustomContentAttachments,
        options?: RequestOptions,
      ): Promise<CustomContentAttachments> => attachment.getCustomContentAttachments(client, parameters, options),
      getLabelAttachments: (parameters: GetLabelAttachments, options?: RequestOptions): Promise<LabelAttachments> =>
        attachment.getLabelAttachments(client, parameters, options),
      getPageAttachments: (parameters: GetPageAttachments, options?: RequestOptions): Promise<PageAttachments> =>
        attachment.getPageAttachments(client, parameters, options),
      getAttachmentThumbnailById: (parameters: GetAttachmentThumbnailById, options?: RequestOptions): Promise<Buffer> =>
        attachment.getAttachmentThumbnailById(client, parameters, options),
    },
    label: {
      getAttachmentLabels: (parameters: GetAttachmentLabels, options?: RequestOptions): Promise<AttachmentLabels> =>
        label.getAttachmentLabels(client, parameters, options),
      getBlogPostLabels: (parameters: GetBlogPostLabels, options?: RequestOptions): Promise<BlogPostLabels> =>
        label.getBlogPostLabels(client, parameters, options),
      getCustomContentLabels: (
        parameters: GetCustomContentLabels,
        options?: RequestOptions,
      ): Promise<CustomContentLabels> => label.getCustomContentLabels(client, parameters, options),
      getLabels: (parameters?: GetLabels, options?: RequestOptions): Promise<Labels> =>
        label.getLabels(client, parameters, options),
      getPageLabels: (parameters: GetPageLabels, options?: RequestOptions): Promise<PageLabels> =>
        label.getPageLabels(client, parameters, options),
      getSpaceLabels: (parameters: GetSpaceLabels, options?: RequestOptions): Promise<SpaceLabels> =>
        label.getSpaceLabels(client, parameters, options),
      getSpaceContentLabels: (
        parameters: GetSpaceContentLabels,
        options?: RequestOptions,
      ): Promise<SpaceContentLabels> => label.getSpaceContentLabels(client, parameters, options),
    },
    operation: {
      getAttachmentOperations: (
        parameters: GetAttachmentOperations,
        options?: RequestOptions,
      ): Promise<PermittedOperations> => operation.getAttachmentOperations(client, parameters, options),
      getBlogPostOperations: (
        parameters: GetBlogPostOperations,
        options?: RequestOptions,
      ): Promise<PermittedOperations> => operation.getBlogPostOperations(client, parameters, options),
      getCustomContentOperations: (
        parameters: GetCustomContentOperations,
        options?: RequestOptions,
      ): Promise<PermittedOperations> => operation.getCustomContentOperations(client, parameters, options),
      getPageOperations: (parameters: GetPageOperations, options?: RequestOptions): Promise<PermittedOperations> =>
        operation.getPageOperations(client, parameters, options),
      getWhiteboardOperations: (
        parameters: GetWhiteboardOperations,
        options?: RequestOptions,
      ): Promise<PermittedOperations> => operation.getWhiteboardOperations(client, parameters, options),
      getDatabaseOperations: (
        parameters: GetDatabaseOperations,
        options?: RequestOptions,
      ): Promise<PermittedOperations> => operation.getDatabaseOperations(client, parameters, options),
      getSmartLinkOperations: (
        parameters: GetSmartLinkOperations,
        options?: RequestOptions,
      ): Promise<PermittedOperations> => operation.getSmartLinkOperations(client, parameters, options),
      getFolderOperations: (parameters: GetFolderOperations, options?: RequestOptions): Promise<PermittedOperations> =>
        operation.getFolderOperations(client, parameters, options),
      getSpaceOperations: (parameters: GetSpaceOperations, options?: RequestOptions): Promise<PermittedOperations> =>
        operation.getSpaceOperations(client, parameters, options),
      getFooterCommentOperations: (
        parameters: GetFooterCommentOperations,
        options?: RequestOptions,
      ): Promise<PermittedOperations> => operation.getFooterCommentOperations(client, parameters, options),
      getInlineCommentOperations: (
        parameters: GetInlineCommentOperations,
        options?: RequestOptions,
      ): Promise<PermittedOperations> => operation.getInlineCommentOperations(client, parameters, options),
    },
    version: {
      getAttachmentVersions: (
        parameters: GetAttachmentVersions,
        options?: RequestOptions,
      ): Promise<AttachmentVersions> => version.getAttachmentVersions(client, parameters, options),
      getBlogPostVersions: (parameters: GetBlogPostVersions, options?: RequestOptions): Promise<BlogPostVersions> =>
        version.getBlogPostVersions(client, parameters, options),
      getPageVersions: (parameters: GetPageVersions, options?: RequestOptions): Promise<PageVersions> =>
        version.getPageVersions(client, parameters, options),
      getFooterCommentVersions: (
        parameters: GetFooterCommentVersions,
        options?: RequestOptions,
      ): Promise<FooterCommentVersions> => version.getFooterCommentVersions(client, parameters, options),
      getInlineCommentVersions: (
        parameters: GetInlineCommentVersions,
        options?: RequestOptions,
      ): Promise<InlineCommentVersions> => version.getInlineCommentVersions(client, parameters, options),
      getAttachmentVersionDetails: (
        parameters: GetAttachmentVersionDetails,
        options?: RequestOptions,
      ): Promise<DetailedVersion> => version.getAttachmentVersionDetails(client, parameters, options),
      getBlogPostVersionDetails: (
        parameters: GetBlogPostVersionDetails,
        options?: RequestOptions,
      ): Promise<DetailedVersion> => version.getBlogPostVersionDetails(client, parameters, options),
      getPageVersionDetails: (parameters: GetPageVersionDetails, options?: RequestOptions): Promise<DetailedVersion> =>
        version.getPageVersionDetails(client, parameters, options),
      getCustomContentVersions: (
        parameters: GetCustomContentVersions,
        options?: RequestOptions,
      ): Promise<CustomContentVersions> => version.getCustomContentVersions(client, parameters, options),
      getCustomContentVersionDetails: (
        parameters: GetCustomContentVersionDetails,
        options?: RequestOptions,
      ): Promise<DetailedVersion> => version.getCustomContentVersionDetails(client, parameters, options),
      getFooterCommentVersionDetails: (
        parameters: GetFooterCommentVersionDetails,
        options?: RequestOptions,
      ): Promise<DetailedVersion> => version.getFooterCommentVersionDetails(client, parameters, options),
      getInlineCommentVersionDetails: (
        parameters: GetInlineCommentVersionDetails,
        options?: RequestOptions,
      ): Promise<DetailedVersion> => version.getInlineCommentVersionDetails(client, parameters, options),
    },
    comment: {
      getAttachmentComments: (
        parameters: GetAttachmentComments,
        options?: RequestOptions,
      ): Promise<AttachmentComments> => comment.getAttachmentComments(client, parameters, options),
      getCustomContentComments: (
        parameters: GetCustomContentComments,
        options?: RequestOptions,
      ): Promise<CustomContentComments> => comment.getCustomContentComments(client, parameters, options),
      getPageFooterComments: (
        parameters: GetPageFooterComments,
        options?: RequestOptions,
      ): Promise<PageFooterComments> => comment.getPageFooterComments(client, parameters, options),
      getPageInlineComments: (
        parameters: GetPageInlineComments,
        options?: RequestOptions,
      ): Promise<PageInlineComments> => comment.getPageInlineComments(client, parameters, options),
      getBlogPostFooterComments: (
        parameters: GetBlogPostFooterComments,
        options?: RequestOptions,
      ): Promise<BlogPostFooterComments> => comment.getBlogPostFooterComments(client, parameters, options),
      getBlogPostInlineComments: (
        parameters: GetBlogPostInlineComments,
        options?: RequestOptions,
      ): Promise<BlogPostInlineComments> => comment.getBlogPostInlineComments(client, parameters, options),
      getFooterComments: (parameters?: GetFooterComments, options?: RequestOptions): Promise<FooterComments> =>
        comment.getFooterComments(client, parameters, options),
      createFooterComment: (parameters: CreateFooterComment, options?: RequestOptions): Promise<FooterComment> =>
        comment.createFooterComment(client, parameters, options),
      getFooterCommentChildren: (
        parameters: GetFooterCommentChildren,
        options?: RequestOptions,
      ): Promise<FooterCommentChildren> => comment.getFooterCommentChildren(client, parameters, options),
      getInlineComments: (parameters?: GetInlineComments, options?: RequestOptions): Promise<InlineComments> =>
        comment.getInlineComments(client, parameters, options),
      createInlineComment: (parameters: CreateInlineComment, options?: RequestOptions): Promise<InlineComment> =>
        comment.createInlineComment(client, parameters, options),
      getInlineCommentChildren: (
        parameters: GetInlineCommentChildren,
        options?: RequestOptions,
      ): Promise<InlineCommentChildrenGet> => comment.getInlineCommentChildren(client, parameters, options),
      getFooterCommentById: (parameters: GetFooterCommentById, options?: RequestOptions): Promise<FooterComment> =>
        comment.getFooterCommentById(client, parameters, options),
      updateFooterComment: (parameters: UpdateFooterComment, options?: RequestOptions): Promise<FooterComment> =>
        comment.updateFooterComment(client, parameters, options),
      deleteFooterComment: (parameters: DeleteFooterComment, options?: RequestOptions): Promise<void> =>
        comment.deleteFooterComment(client, parameters, options),
      getInlineCommentById: (parameters: GetInlineCommentById, options?: RequestOptions): Promise<InlineComment> =>
        comment.getInlineCommentById(client, parameters, options),
      updateInlineComment: (parameters: UpdateInlineComment, options?: RequestOptions): Promise<InlineComment> =>
        comment.updateInlineComment(client, parameters, options),
      deleteInlineComment: (parameters: DeleteInlineComment, options?: RequestOptions): Promise<void> =>
        comment.deleteInlineComment(client, parameters, options),
    },
    blogPost: {
      getBlogPosts: (parameters?: GetBlogPosts, options?: RequestOptions): Promise<BlogPosts> =>
        blogPost.getBlogPosts(client, parameters, options),
      createBlogPost: (parameters: CreateBlogPost, options?: RequestOptions): Promise<BlogPost> =>
        blogPost.createBlogPost(client, parameters, options),
      getBlogPostById: (parameters: GetBlogPostById, options?: RequestOptions): Promise<BlogPost> =>
        blogPost.getBlogPostById(client, parameters, options),
      updateBlogPost: (parameters: UpdateBlogPost, options?: RequestOptions): Promise<BlogPost> =>
        blogPost.updateBlogPost(client, parameters, options),
      deleteBlogPost: (parameters: DeleteBlogPost, options?: RequestOptions): Promise<void> =>
        blogPost.deleteBlogPost(client, parameters, options),
      getLabelBlogPosts: (parameters: GetLabelBlogPosts, options?: RequestOptions): Promise<LabelBlogPosts> =>
        blogPost.getLabelBlogPosts(client, parameters, options),
      getBlogPostsInSpace: (parameters: GetBlogPostsInSpace, options?: RequestOptions): Promise<BlogPostsInSpace> =>
        blogPost.getBlogPostsInSpace(client, parameters, options),
    },
    customContent: {
      getCustomContentByTypeInBlogPost: (
        parameters: GetCustomContentByTypeInBlogPost,
        options?: RequestOptions,
      ): Promise<CustomContentByTypeInBlogPost> =>
        customContent.getCustomContentByTypeInBlogPost(client, parameters, options),
      getCustomContentByType: (
        parameters: GetCustomContentByType,
        options?: RequestOptions,
      ): Promise<CustomContentByType> => customContent.getCustomContentByType(client, parameters, options),
      createCustomContent: (parameters: CreateCustomContent, options?: RequestOptions): Promise<CustomContent> =>
        customContent.createCustomContent(client, parameters, options),
      getCustomContentById: (parameters: GetCustomContentById, options?: RequestOptions): Promise<CustomContent> =>
        customContent.getCustomContentById(client, parameters, options),
      updateCustomContent: (parameters: UpdateCustomContent, options?: RequestOptions): Promise<CustomContent> =>
        customContent.updateCustomContent(client, parameters, options),
      deleteCustomContent: (parameters: DeleteCustomContent, options?: RequestOptions): Promise<void> =>
        customContent.deleteCustomContent(client, parameters, options),
      getCustomContentByTypeInPage: (
        parameters: GetCustomContentByTypeInPage,
        options?: RequestOptions,
      ): Promise<CustomContentByTypeInPage> => customContent.getCustomContentByTypeInPage(client, parameters, options),
      getCustomContentByTypeInSpace: (
        parameters: GetCustomContentByTypeInSpace,
        options?: RequestOptions,
      ): Promise<CustomContentByTypeInSpace> =>
        customContent.getCustomContentByTypeInSpace(client, parameters, options),
    },
    like: {
      getBlogPostLikeCount: (parameters: GetBlogPostLikeCount, options?: RequestOptions): Promise<BlogPostLikeCount> =>
        like.getBlogPostLikeCount(client, parameters, options),
      getBlogPostLikeUsers: (parameters: GetBlogPostLikeUsers, options?: RequestOptions): Promise<BlogPostLikeUsers> =>
        like.getBlogPostLikeUsers(client, parameters, options),
      getPageLikeCount: (parameters: GetPageLikeCount, options?: RequestOptions): Promise<PageLikeCount> =>
        like.getPageLikeCount(client, parameters, options),
      getPageLikeUsers: (parameters: GetPageLikeUsers, options?: RequestOptions): Promise<PageLikeUsers> =>
        like.getPageLikeUsers(client, parameters, options),
      getFooterLikeCount: (parameters: GetFooterLikeCount, options?: RequestOptions): Promise<FooterLikeCount> =>
        like.getFooterLikeCount(client, parameters, options),
      getFooterLikeUsers: (parameters: GetFooterLikeUsers, options?: RequestOptions): Promise<FooterLikeUsers> =>
        like.getFooterLikeUsers(client, parameters, options),
      getInlineLikeCount: (parameters: GetInlineLikeCount, options?: RequestOptions): Promise<InlineLikeCount> =>
        like.getInlineLikeCount(client, parameters, options),
      getInlineLikeUsers: (parameters: GetInlineLikeUsers, options?: RequestOptions): Promise<InlineLikeUsers> =>
        like.getInlineLikeUsers(client, parameters, options),
    },
    content: {
      convertContentIdsToContentTypes: (
        parameters: ConvertContentIdsToContentTypes,
        options?: RequestOptions,
      ): Promise<ContentIdToContentType> => content.convertContentIdsToContentTypes(client, parameters, options),
    },
    page: {
      getLabelPages: (parameters: GetLabelPages, options?: RequestOptions): Promise<LabelPages> =>
        page.getLabelPages(client, parameters, options),
      getPages: (parameters?: GetPages, options?: RequestOptions): Promise<Pages> =>
        page.getPages(client, parameters, options),
      createPage: (parameters: CreatePage, options?: RequestOptions): Promise<Page> =>
        page.createPage(client, parameters, options),
      getPageById: (parameters: GetPageById, options?: RequestOptions): Promise<Page> =>
        page.getPageById(client, parameters, options),
      updatePage: (parameters: UpdatePage, options?: RequestOptions): Promise<Page> =>
        page.updatePage(client, parameters, options),
      deletePage: (parameters: DeletePage, options?: RequestOptions): Promise<void> =>
        page.deletePage(client, parameters, options),
      updatePageTitle: (parameters: UpdatePageTitle, options?: RequestOptions): Promise<Page> =>
        page.updatePageTitle(client, parameters, options),
      getPagesInSpace: (parameters: GetPagesInSpace, options?: RequestOptions): Promise<PagesInSpace> =>
        page.getPagesInSpace(client, parameters, options),
    },
    redactions: {
      postRedactPage: (parameters: PostRedactPage, options?: RequestOptions): Promise<RedactionResponse> =>
        redactions.postRedactPage(client, parameters, options),
      postRedactBlog: (parameters: PostRedactBlog, options?: RequestOptions): Promise<RedactionResponse> =>
        redactions.postRedactBlog(client, parameters, options),
    },
    whiteboard: {
      createWhiteboard: (parameters: CreateWhiteboard, options?: RequestOptions): Promise<Whiteboard> =>
        whiteboard.createWhiteboard(client, parameters, options),
      getWhiteboardById: (parameters: GetWhiteboardById, options?: RequestOptions): Promise<Whiteboard> =>
        whiteboard.getWhiteboardById(client, parameters, options),
      deleteWhiteboard: (parameters: DeleteWhiteboard, options?: RequestOptions): Promise<void> =>
        whiteboard.deleteWhiteboard(client, parameters, options),
    },
    contentProperties: {
      getWhiteboardContentProperties: (
        parameters: GetWhiteboardContentProperties,
        options?: RequestOptions,
      ): Promise<WhiteboardContentProperties> =>
        contentProperties.getWhiteboardContentProperties(client, parameters, options),
      createWhiteboardProperty: (
        parameters: CreateWhiteboardProperty,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.createWhiteboardProperty(client, parameters, options),
      getDatabaseContentProperties: (
        parameters: GetDatabaseContentProperties,
        options?: RequestOptions,
      ): Promise<DatabaseContentProperties> =>
        contentProperties.getDatabaseContentProperties(client, parameters, options),
      createDatabaseProperty: (
        parameters: CreateDatabaseProperty,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.createDatabaseProperty(client, parameters, options),
      getSmartLinkContentProperties: (
        parameters: GetSmartLinkContentProperties,
        options?: RequestOptions,
      ): Promise<SmartLinkContentProperties> =>
        contentProperties.getSmartLinkContentProperties(client, parameters, options),
      createSmartLinkProperty: (
        parameters: CreateSmartLinkProperty,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.createSmartLinkProperty(client, parameters, options),
      getFolderContentProperties: (
        parameters: GetFolderContentProperties,
        options?: RequestOptions,
      ): Promise<FolderContentProperties> => contentProperties.getFolderContentProperties(client, parameters, options),
      createFolderProperty: (parameters: CreateFolderProperty, options?: RequestOptions): Promise<ContentProperty> =>
        contentProperties.createFolderProperty(client, parameters, options),
      getAttachmentContentProperties: (
        parameters: GetAttachmentContentProperties,
        options?: RequestOptions,
      ): Promise<AttachmentContentProperties> =>
        contentProperties.getAttachmentContentProperties(client, parameters, options),
      createAttachmentProperty: (
        parameters: CreateAttachmentProperty,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.createAttachmentProperty(client, parameters, options),
      getAttachmentContentPropertiesById: (
        parameters: GetAttachmentContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.getAttachmentContentPropertiesById(client, parameters, options),
      updateAttachmentPropertyById: (
        parameters: UpdateAttachmentPropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updateAttachmentPropertyById(client, parameters, options),
      deleteAttachmentPropertyById: (
        parameters: DeleteAttachmentPropertyById,
        options?: RequestOptions,
      ): Promise<void> => contentProperties.deleteAttachmentPropertyById(client, parameters, options),
      getBlogpostContentProperties: (
        parameters: GetBlogpostContentProperties,
        options?: RequestOptions,
      ): Promise<BlogpostContentProperties> =>
        contentProperties.getBlogpostContentProperties(client, parameters, options),
      createBlogpostProperty: (
        parameters: CreateBlogpostProperty,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.createBlogpostProperty(client, parameters, options),
      getBlogpostContentPropertiesById: (
        parameters: GetBlogpostContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.getBlogpostContentPropertiesById(client, parameters, options),
      updateBlogpostPropertyById: (
        parameters: UpdateBlogpostPropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updateBlogpostPropertyById(client, parameters, options),
      deleteBlogpostPropertyById: (parameters: DeleteBlogpostPropertyById, options?: RequestOptions): Promise<void> =>
        contentProperties.deleteBlogpostPropertyById(client, parameters, options),
      getCustomContentContentProperties: (
        parameters: GetCustomContentContentProperties,
        options?: RequestOptions,
      ): Promise<CustomContentContentProperties> =>
        contentProperties.getCustomContentContentProperties(client, parameters, options),
      createCustomContentProperty: (
        parameters: CreateCustomContentProperty,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.createCustomContentProperty(client, parameters, options),
      getCustomContentContentPropertiesById: (
        parameters: GetCustomContentContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> =>
        contentProperties.getCustomContentContentPropertiesById(client, parameters, options),
      updateCustomContentPropertyById: (
        parameters: UpdateCustomContentPropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updateCustomContentPropertyById(client, parameters, options),
      deleteCustomContentPropertyById: (
        parameters: DeleteCustomContentPropertyById,
        options?: RequestOptions,
      ): Promise<void> => contentProperties.deleteCustomContentPropertyById(client, parameters, options),
      getPageContentProperties: (
        parameters: GetPageContentProperties,
        options?: RequestOptions,
      ): Promise<PageContentProperties> => contentProperties.getPageContentProperties(client, parameters, options),
      createPageProperty: (parameters: CreatePageProperty, options?: RequestOptions): Promise<ContentProperty> =>
        contentProperties.createPageProperty(client, parameters, options),
      getPageContentPropertiesById: (
        parameters: GetPageContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.getPageContentPropertiesById(client, parameters, options),
      updatePagePropertyById: (
        parameters: UpdatePagePropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updatePagePropertyById(client, parameters, options),
      deletePagePropertyById: (parameters: DeletePagePropertyById, options?: RequestOptions): Promise<void> =>
        contentProperties.deletePagePropertyById(client, parameters, options),
      getWhiteboardContentPropertiesById: (
        parameters: GetWhiteboardContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.getWhiteboardContentPropertiesById(client, parameters, options),
      updateWhiteboardPropertyById: (
        parameters: UpdateWhiteboardPropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updateWhiteboardPropertyById(client, parameters, options),
      deleteWhiteboardPropertyById: (
        parameters: DeleteWhiteboardPropertyById,
        options?: RequestOptions,
      ): Promise<void> => contentProperties.deleteWhiteboardPropertyById(client, parameters, options),
      getDatabaseContentPropertiesById: (
        parameters: GetDatabaseContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.getDatabaseContentPropertiesById(client, parameters, options),
      updateDatabasePropertyById: (
        parameters: UpdateDatabasePropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updateDatabasePropertyById(client, parameters, options),
      deleteDatabasePropertyById: (parameters: DeleteDatabasePropertyById, options?: RequestOptions): Promise<void> =>
        contentProperties.deleteDatabasePropertyById(client, parameters, options),
      getSmartLinkContentPropertiesById: (
        parameters: GetSmartLinkContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.getSmartLinkContentPropertiesById(client, parameters, options),
      updateSmartLinkPropertyById: (
        parameters: UpdateSmartLinkPropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updateSmartLinkPropertyById(client, parameters, options),
      deleteSmartLinkPropertyById: (parameters: DeleteSmartLinkPropertyById, options?: RequestOptions): Promise<void> =>
        contentProperties.deleteSmartLinkPropertyById(client, parameters, options),
      getFolderContentPropertiesById: (
        parameters: GetFolderContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.getFolderContentPropertiesById(client, parameters, options),
      updateFolderPropertyById: (
        parameters: UpdateFolderPropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updateFolderPropertyById(client, parameters, options),
      deleteFolderPropertyById: (parameters: DeleteFolderPropertyById, options?: RequestOptions): Promise<void> =>
        contentProperties.deleteFolderPropertyById(client, parameters, options),
      getCommentContentProperties: (
        parameters: GetCommentContentProperties,
        options?: RequestOptions,
      ): Promise<CommentContentProperties> =>
        contentProperties.getCommentContentProperties(client, parameters, options),
      createCommentProperty: (parameters: CreateCommentProperty, options?: RequestOptions): Promise<ContentProperty> =>
        contentProperties.createCommentProperty(client, parameters, options),
      getCommentContentPropertiesById: (
        parameters: GetCommentContentPropertiesById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.getCommentContentPropertiesById(client, parameters, options),
      updateCommentPropertyById: (
        parameters: UpdateCommentPropertyById,
        options?: RequestOptions,
      ): Promise<ContentProperty> => contentProperties.updateCommentPropertyById(client, parameters, options),
      deleteCommentPropertyById: (parameters: DeleteCommentPropertyById, options?: RequestOptions): Promise<void> =>
        contentProperties.deleteCommentPropertyById(client, parameters, options),
    },
    children: {
      getWhiteboardDirectChildren: (
        parameters: GetWhiteboardDirectChildren,
        options?: RequestOptions,
      ): Promise<WhiteboardDirectChildren> => children.getWhiteboardDirectChildren(client, parameters, options),
      getDatabaseDirectChildren: (
        parameters: GetDatabaseDirectChildren,
        options?: RequestOptions,
      ): Promise<DatabaseDirectChildren> => children.getDatabaseDirectChildren(client, parameters, options),
      getSmartLinkDirectChildren: (
        parameters: GetSmartLinkDirectChildren,
        options?: RequestOptions,
      ): Promise<SmartLinkDirectChildren> => children.getSmartLinkDirectChildren(client, parameters, options),
      getFolderDirectChildren: (
        parameters: GetFolderDirectChildren,
        options?: RequestOptions,
      ): Promise<FolderDirectChildren> => children.getFolderDirectChildren(client, parameters, options),
      getChildPages: (parameters: GetChildPages, options?: RequestOptions): Promise<ChildPages> =>
        children.getChildPages(client, parameters, options),
      getChildCustomContent: (
        parameters: GetChildCustomContent,
        options?: RequestOptions,
      ): Promise<ChildCustomContentGet> => children.getChildCustomContent(client, parameters, options),
      getPageDirectChildren: (
        parameters: GetPageDirectChildren,
        options?: RequestOptions,
      ): Promise<PageDirectChildren> => children.getPageDirectChildren(client, parameters, options),
    },
    descendants: {
      getWhiteboardDescendants: (
        parameters: GetWhiteboardDescendants,
        options?: RequestOptions,
      ): Promise<WhiteboardDescendants> => descendants.getWhiteboardDescendants(client, parameters, options),
      getDatabaseDescendants: (
        parameters: GetDatabaseDescendants,
        options?: RequestOptions,
      ): Promise<DatabaseDescendants> => descendants.getDatabaseDescendants(client, parameters, options),
      getSmartLinkDescendants: (
        parameters: GetSmartLinkDescendants,
        options?: RequestOptions,
      ): Promise<SmartLinkDescendants> => descendants.getSmartLinkDescendants(client, parameters, options),
      getFolderDescendants: (parameters: GetFolderDescendants, options?: RequestOptions): Promise<FolderDescendants> =>
        descendants.getFolderDescendants(client, parameters, options),
      getPageDescendants: (parameters: GetPageDescendants, options?: RequestOptions): Promise<PageDescendants> =>
        descendants.getPageDescendants(client, parameters, options),
    },
    ancestors: {
      getWhiteboardAncestors: (
        parameters: GetWhiteboardAncestors,
        options?: RequestOptions,
      ): Promise<WhiteboardAncestors> => ancestors.getWhiteboardAncestors(client, parameters, options),
      getDatabaseAncestors: (parameters: GetDatabaseAncestors, options?: RequestOptions): Promise<DatabaseAncestors> =>
        ancestors.getDatabaseAncestors(client, parameters, options),
      getSmartLinkAncestors: (
        parameters: GetSmartLinkAncestors,
        options?: RequestOptions,
      ): Promise<SmartLinkAncestors> => ancestors.getSmartLinkAncestors(client, parameters, options),
      getFolderAncestors: (parameters: GetFolderAncestors, options?: RequestOptions): Promise<FolderAncestors> =>
        ancestors.getFolderAncestors(client, parameters, options),
      getPageAncestors: (parameters: GetPageAncestors, options?: RequestOptions): Promise<PageAncestors> =>
        ancestors.getPageAncestors(client, parameters, options),
    },
    database: {
      createDatabase: (parameters: CreateDatabase, options?: RequestOptions): Promise<Database> =>
        database.createDatabase(client, parameters, options),
      getDatabaseById: (parameters: GetDatabaseById, options?: RequestOptions): Promise<Database> =>
        database.getDatabaseById(client, parameters, options),
      deleteDatabase: (parameters: DeleteDatabase, options?: RequestOptions): Promise<void> =>
        database.deleteDatabase(client, parameters, options),
    },
    smartLink: {
      createSmartLink: (parameters: CreateSmartLink, options?: RequestOptions): Promise<SmartLink> =>
        smartLink.createSmartLink(client, parameters, options),
      getSmartLinkById: (parameters: GetSmartLinkById, options?: RequestOptions): Promise<SmartLink> =>
        smartLink.getSmartLinkById(client, parameters, options),
      deleteSmartLink: (parameters: DeleteSmartLink, options?: RequestOptions): Promise<void> =>
        smartLink.deleteSmartLink(client, parameters, options),
    },
    folder: {
      createFolder: (parameters: CreateFolder, options?: RequestOptions): Promise<Folder> =>
        folder.createFolder(client, parameters, options),
      getFolderById: (parameters: GetFolderById, options?: RequestOptions): Promise<Folder> =>
        folder.getFolderById(client, parameters, options),
      deleteFolder: (parameters: DeleteFolder, options?: RequestOptions): Promise<void> =>
        folder.deleteFolder(client, parameters, options),
    },
    space: {
      getSpaces: (parameters?: GetSpaces, options?: RequestOptions): Promise<Spaces> =>
        space.getSpaces(client, parameters, options),
      createSpace: (parameters: CreateSpace, options?: RequestOptions): Promise<SpaceSummary> =>
        space.createSpace(client, parameters, options),
      getSpaceById: (parameters: GetSpaceById, options?: RequestOptions): Promise<Space> =>
        space.getSpaceById(client, parameters, options),
    },
    spacePermissions: {
      getSpacePermissionsAssignments: (
        parameters: GetSpacePermissionsAssignments,
        options?: RequestOptions,
      ): Promise<SpacePermissionsAssignments> =>
        spacePermissions.getSpacePermissionsAssignments(client, parameters, options),
      getAvailableSpacePermissions: (
        parameters?: GetAvailableSpacePermissions,
        options?: RequestOptions,
      ): Promise<AvailableSpacePermissions> =>
        spacePermissions.getAvailableSpacePermissions(client, parameters, options),
    },
    spacePermissionTransition: {
      listSpacePermissionCombinations: (
        parameters?: ListSpacePermissionCombinations,
        options?: RequestOptions,
      ): Promise<ListSpacePermissionCombinationsResponse> =>
        spacePermissionTransition.listSpacePermissionCombinations(client, parameters, options),
      generateSpacePermissionCombinations: (options?: RequestOptions): Promise<BulkTransitionTask> =>
        spacePermissionTransition.generateSpacePermissionCombinations(client, options),
      bulkAssignSpacePermissionRoles: (
        parameters: BulkAssignSpacePermissionRoles,
        options?: RequestOptions,
      ): Promise<BulkTransitionTask> =>
        spacePermissionTransition.bulkAssignSpacePermissionRoles(client, parameters, options),
      bulkRemoveSpacePermissionAccess: (
        parameters: BulkRemoveSpacePermissionAccess,
        options?: RequestOptions,
      ): Promise<BulkTransitionTask> =>
        spacePermissionTransition.bulkRemoveSpacePermissionAccess(client, parameters, options),
      getSpacePermissionTransitionTaskStatus: (
        parameters: GetSpacePermissionTransitionTaskStatus,
        options?: RequestOptions,
      ): Promise<BulkTransitionTaskStatus> =>
        spacePermissionTransition.getSpacePermissionTransitionTaskStatus(client, parameters, options),
    },
    spaceRoles: {
      getAvailableSpaceRoles: (
        parameters?: GetAvailableSpaceRoles,
        options?: RequestOptions,
      ): Promise<AvailableSpaceRoles> => spaceRoles.getAvailableSpaceRoles(client, parameters, options),
      createSpaceRole: (parameters: CreateSpaceRole, options?: RequestOptions): Promise<SpaceRole> =>
        spaceRoles.createSpaceRole(client, parameters, options),
      getSpaceRolesById: (parameters: GetSpaceRolesById, options?: RequestOptions): Promise<SpaceRole> =>
        spaceRoles.getSpaceRolesById(client, parameters, options),
      updateSpaceRole: (parameters: UpdateSpaceRole, options?: RequestOptions): Promise<UpdateSpaceRoleResponse> =>
        spaceRoles.updateSpaceRole(client, parameters, options),
      deleteSpaceRole: (parameters: DeleteSpaceRole, options?: RequestOptions): Promise<DeleteSpaceRoleResponse> =>
        spaceRoles.deleteSpaceRole(client, parameters, options),
      getSpaceRoleMode: (options?: RequestOptions): Promise<SpaceRoleMode> =>
        spaceRoles.getSpaceRoleMode(client, options),
      getSpaceRoleAssignments: (
        parameters: GetSpaceRoleAssignments,
        options?: RequestOptions,
      ): Promise<SpaceRoleAssignmentsGet> => spaceRoles.getSpaceRoleAssignments(client, parameters, options),
      setSpaceRoleAssignments: (
        parameters: SetSpaceRoleAssignments,
        options?: RequestOptions,
      ): Promise<SpaceRoleAssignmentsSet> => spaceRoles.setSpaceRoleAssignments(client, parameters, options),
    },
    task: {
      getTasks: (parameters?: GetTasks, options?: RequestOptions): Promise<Tasks> =>
        task.getTasks(client, parameters, options),
      getTaskById: (parameters: GetTaskById, options?: RequestOptions): Promise<Task> =>
        task.getTaskById(client, parameters, options),
      updateTask: (parameters: UpdateTask, options?: RequestOptions): Promise<Task> =>
        task.updateTask(client, parameters, options),
    },
    user: {
      createBulkUserLookup: (parameters: CreateBulkUserLookup, options?: RequestOptions): Promise<BulkUserLookup> =>
        user.createBulkUserLookup(client, parameters, options),
      checkAccessByEmail: (parameters: CheckAccessByEmail, options?: RequestOptions): Promise<AccessByEmail> =>
        user.checkAccessByEmail(client, parameters, options),
      inviteByEmail: (parameters: InviteByEmail, options?: RequestOptions): Promise<void> =>
        user.inviteByEmail(client, parameters, options),
    },
    dataPolicies: {
      getDataPolicyMetadata: (options?: RequestOptions): Promise<DataPolicyMetadata> =>
        dataPolicies.getDataPolicyMetadata(client, options),
      getDataPolicySpaces: (parameters?: GetDataPolicySpaces, options?: RequestOptions): Promise<DataPolicySpaces> =>
        dataPolicies.getDataPolicySpaces(client, parameters, options),
    },
    classificationLevel: {
      getClassificationLevels: (options?: RequestOptions): Promise<ClassificationLevel[]> =>
        classificationLevel.getClassificationLevels(client, options),
      getSpaceDefaultClassificationLevel: (
        parameters: GetSpaceDefaultClassificationLevel,
        options?: RequestOptions,
      ): Promise<ClassificationLevel> =>
        classificationLevel.getSpaceDefaultClassificationLevel(client, parameters, options),
      putSpaceDefaultClassificationLevel: (
        parameters: PutSpaceDefaultClassificationLevel,
        options?: RequestOptions,
      ): Promise<void> => classificationLevel.putSpaceDefaultClassificationLevel(client, parameters, options),
      deleteSpaceDefaultClassificationLevel: (
        parameters: DeleteSpaceDefaultClassificationLevel,
        options?: RequestOptions,
      ): Promise<void> => classificationLevel.deleteSpaceDefaultClassificationLevel(client, parameters, options),
      getPageClassificationLevel: (
        parameters: GetPageClassificationLevel,
        options?: RequestOptions,
      ): Promise<ClassificationLevel> => classificationLevel.getPageClassificationLevel(client, parameters, options),
      putPageClassificationLevel: (parameters: PutPageClassificationLevel, options?: RequestOptions): Promise<void> =>
        classificationLevel.putPageClassificationLevel(client, parameters, options),
      postPageClassificationLevel: (parameters: PostPageClassificationLevel, options?: RequestOptions): Promise<void> =>
        classificationLevel.postPageClassificationLevel(client, parameters, options),
      getBlogPostClassificationLevel: (
        parameters: GetBlogPostClassificationLevel,
        options?: RequestOptions,
      ): Promise<ClassificationLevel> =>
        classificationLevel.getBlogPostClassificationLevel(client, parameters, options),
      putBlogPostClassificationLevel: (
        parameters: PutBlogPostClassificationLevel,
        options?: RequestOptions,
      ): Promise<void> => classificationLevel.putBlogPostClassificationLevel(client, parameters, options),
      postBlogPostClassificationLevel: (
        parameters: PostBlogPostClassificationLevel,
        options?: RequestOptions,
      ): Promise<void> => classificationLevel.postBlogPostClassificationLevel(client, parameters, options),
      getWhiteboardClassificationLevel: (
        parameters: GetWhiteboardClassificationLevel,
        options?: RequestOptions,
      ): Promise<ClassificationLevel> =>
        classificationLevel.getWhiteboardClassificationLevel(client, parameters, options),
      putWhiteboardClassificationLevel: (
        parameters: PutWhiteboardClassificationLevel,
        options?: RequestOptions,
      ): Promise<void> => classificationLevel.putWhiteboardClassificationLevel(client, parameters, options),
      postWhiteboardClassificationLevel: (
        parameters: PostWhiteboardClassificationLevel,
        options?: RequestOptions,
      ): Promise<void> => classificationLevel.postWhiteboardClassificationLevel(client, parameters, options),
      getDatabaseClassificationLevel: (
        parameters: GetDatabaseClassificationLevel,
        options?: RequestOptions,
      ): Promise<ClassificationLevel> =>
        classificationLevel.getDatabaseClassificationLevel(client, parameters, options),
      putDatabaseClassificationLevel: (
        parameters: PutDatabaseClassificationLevel,
        options?: RequestOptions,
      ): Promise<void> => classificationLevel.putDatabaseClassificationLevel(client, parameters, options),
      postDatabaseClassificationLevel: (
        parameters: PostDatabaseClassificationLevel,
        options?: RequestOptions,
      ): Promise<void> => classificationLevel.postDatabaseClassificationLevel(client, parameters, options),
    },
    appProperties: {
      getForgeAppProperties: (
        parameters?: GetForgeAppProperties,
        options?: RequestOptions,
      ): Promise<ForgeAppProperties> => appProperties.getForgeAppProperties(client, parameters, options),
      getForgeAppProperty: (parameters: GetForgeAppProperty, options?: RequestOptions): Promise<ForgeAppProperty> =>
        appProperties.getForgeAppProperty(client, parameters, options),
      putForgeAppProperty: (parameters: PutForgeAppProperty, options?: RequestOptions): Promise<void> =>
        appProperties.putForgeAppProperty(client, parameters, options),
      deleteForgeAppProperty: (parameters: DeleteForgeAppProperty, options?: RequestOptions): Promise<void> =>
        appProperties.deleteForgeAppProperty(client, parameters, options),
    },
    spaceProperties: {
      getSpaceProperties: (parameters: GetSpaceProperties, options?: RequestOptions): Promise<SpaceProperties> =>
        spaceProperties.getSpaceProperties(client, parameters, options),
      createSpaceProperty: (parameters: CreateSpaceProperty, options?: RequestOptions): Promise<SpaceProperty> =>
        spaceProperties.createSpaceProperty(client, parameters, options),
      getSpacePropertyById: (parameters: GetSpacePropertyById, options?: RequestOptions): Promise<SpaceProperty> =>
        spaceProperties.getSpacePropertyById(client, parameters, options),
      updateSpacePropertyById: (
        parameters: UpdateSpacePropertyById,
        options?: RequestOptions,
      ): Promise<SpaceProperty> => spaceProperties.updateSpacePropertyById(client, parameters, options),
      deleteSpacePropertyById: (parameters: DeleteSpacePropertyById, options?: RequestOptions): Promise<void> =>
        spaceProperties.deleteSpacePropertyById(client, parameters, options),
    },
  };
}

export type V2Client = ReturnType<typeof createV2Client>;
