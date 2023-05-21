import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { InlineCommentProperties } from './inlineCommentProperties';
import { InlineCommentResolutionStatus } from './inlineCommentResolutionStatus';
import { Version } from './version';

export interface InlineCommentModel {
  /** ID of the comment. */
  id?: {};
  status?: ContentStatus;
  /** Title of the comment. */
  title?: string;
  /** ID of the blog post containing the comment if the comment is on a blog post. */
  blogPostId?: {};
  /** ID of the page containing the comment if the comment is on a page. */
  pageId?: {};
  /** ID of the parent comment if the comment is a reply. */
  parentCommentId?: {};
  version?: Version;
  body?: Body;
  /**
   * Atlassian Account ID of the last person who modified the resolve state of the comment. Null until comment is
   * resolved or reopened.
   */
  resolutionLastModifierId?: string;
  /** Timestamp of the last modification to the comment's resolution status. Null until comment is resolved or reopened. */
  resolutionLastModifiedAt?: string;
  resolutionStatus?: InlineCommentResolutionStatus;
  properties?: InlineCommentProperties;
}
