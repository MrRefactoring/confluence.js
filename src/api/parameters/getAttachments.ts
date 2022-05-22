export interface GetAttachments {
  /** The ID of the content to be queried for its attachments. */
  id: string;
  /** A multi-value parameter indicating which properties of the content to expand. */
  expand?:
  | 'childTypes.all'
  | 'childTypes.attachment'
  | 'childTypes.comment'
  | 'childTypes.page'
  | 'container'
  | 'metadata'
  | 'metadata.currentuser'
  | 'metadata.properties'
  | 'metadata.labels'
  | 'metadata.frontend'
  | 'operations'
  | 'children.page'
  | 'children.attachment'
  | 'children.comment'
  | 'restrictions.read.restrictions.user'
  | 'restrictions.read.restrictions.group'
  | 'restrictions.update.restrictions.user'
  | 'restrictions.update.restrictions.group'
  | 'history'
  | 'history.lastUpdated'
  | 'history.previousVersion'
  | 'history.contributors'
  | 'history.nextVersion'
  | 'ancestors'
  | 'body'
  | 'version'
  | 'descendants.page'
  | 'descendants.attachment'
  | 'descendants.comment'
  | 'space'
  | 'extensions.inlineProperties'
  | 'extensions.resolution'
  | (
    | 'childTypes.all'
    | 'childTypes.attachment'
    | 'childTypes.comment'
    | 'childTypes.page'
    | 'container'
    | 'metadata'
    | 'metadata.currentuser'
    | 'metadata.properties'
    | 'metadata.labels'
    | 'metadata.frontend'
    | 'operations'
    | 'children.page'
    | 'children.attachment'
    | 'children.comment'
    | 'restrictions.read.restrictions.user'
    | 'restrictions.read.restrictions.group'
    | 'restrictions.update.restrictions.user'
    | 'restrictions.update.restrictions.group'
    | 'history'
    | 'history.lastUpdated'
    | 'history.previousVersion'
    | 'history.contributors'
    | 'history.nextVersion'
    | 'ancestors'
    | 'body'
    | 'version'
    | 'descendants.page'
    | 'descendants.attachment'
    | 'descendants.comment'
    | 'space'
    | 'extensions.inlineProperties'
    | 'extensions.resolution'
  )[]
  | string
  | string[]
  | GetAttachments.Expand
  | GetAttachments.Expand[];
  /** The starting index of the returned attachments. */
  start?: number;
  /** The maximum number of attachments to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
  /** Filter the results to attachments that match the filename. */
  filename?: string;
  /** Filter the results to attachments that match the media type. */
  mediaType?: string;
}

export namespace GetAttachments {
  export enum Expand {
    /**
     * Returns whether the content has attachments, comments, or child pages. Use this if you only need to check whether
     * the content has children of a particular type.
     */
    AllChildTypes = 'childTypes.all',
    /** Returns whether the content has attachments. */
    AttachmentChildType = 'childTypes.attachment',
    /** Returns whether the content has comments. */
    CommentChildType = 'childTypes.comment',
    /** Returns whether the content has child pages. */
    PageChildType = 'childTypes.page',
    /**
     * Returns the space that the content is in. This is the same as the information returned by [Get
     * space](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---attachments/).
     */
    Container = 'container',
    /**
     * Returns information about the current user in relation to the content, including when they last viewed it,
     * modified it, contributed to it, or added it as a favorite.
     */
    CurrentUserMetadata = 'metadata.currentuser',
    /** Returns content properties that have been set via the Confluence REST API. */
    PropertiesMetadata = 'metadata.properties',
    /** Returns the labels that have been added to the content. */
    LabelsMetadata = 'metadata.labels',
    /** This property is only used by Atlassian. */
    FrontendMetadata = 'metadata.frontend',
    /** Returns the operations for the content, which are used when setting permissions. */
    Operations = 'operations',
    /** Returns pages that are descendants at the level immediately below the content. */
    PageChildren = 'children.page',
    /** Returns all attachments for the content. */
    AttachmentChildren = 'children.attachment',
    /** Returns all comments on the content. */
    CommentChildren = 'children.comment',
    /** Returns the users that have permission to read the content. */
    ReadUserRestriction = 'restrictions.read.restrictions.user',
    /**
     * Returns the groups that have permission to read the content. Note that this may return deleted groups, because
     * deleting a group doesn't remove associated restrictions.
     */
    ReadGroupRestriction = 'restrictions.read.restrictions.group',
    /** Returns the users that have permission to update the content. */
    UpdateUserRestriction = 'restrictions.update.restrictions.user',
    /**
     * Returns the groups that have permission to update the content. Note that this may return deleted groups because
     * deleting a group doesn't remove associated restrictions.
     */
    UpdateGroupRestriction = 'restrictions.update.restrictions.group',
    /** Returns the history of the content, including the date it was created. */
    History = 'history',
    /** Returns information about the most recent update of the content, including who updated it and when it was updated. */
    LastUpdated = 'history.lastUpdated',
    /** Returns information about the update prior to the current content update. */
    PreviousVersion = 'history.previousVersion',
    /** Returns all of the users who have contributed to the content. */
    Contributors = 'history.contributors',
    /** Returns information about the update after to the current content update. */
    NextVersion = 'history.nextVersion',
    /** Returns the parent page, if the content is a page. */
    Ancestors = 'ancestors',
    /** Returns the body of the content in different formats, including the editor format, view format, and export format. */
    Body = 'body',
    /** Returns information about the most recent update of the content, including who updated it and when it was updated. */
    Version = 'version',
    /** Returns pages that are descendants at any level below the content. */
    PageDescendant = 'descendants.page',
    /** Returns all attachments for the content, same as `children.attachment`. */
    AttachmentDescendant = 'descendants.attachment',
    /** Returns all comments on the content, same as `children.comment`. */
    CommentDescendant = 'descendants.comment',
    /**
     * Returns the space that the content is in. This is the same as the information returned by [Get
     * space](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---attachments/).
     */
    Space = 'space',
    /** Returns inline comment-specific properties. */
    InlineProperties = 'extensions.inlineProperties',
    /** Returns the resolution status of each comment. */
    Resolution = 'extensions.resolution',
  }
}
