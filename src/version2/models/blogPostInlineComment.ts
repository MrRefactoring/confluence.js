import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { InlineCommentProperties } from './inlineCommentProperties';
import { InlineCommentResolutionStatus } from './inlineCommentResolutionStatus';
import { Version } from './version';

export interface BlogPostInlineComment {
  /** ID of the comment. */
  id?: {};
  status?: ContentStatus;
  /** Title of the comment. */
  title?: string;
  /** ID of the blog post the comment is in. */
  blogPostId?: {};
  version?: Version;
  body?: Body;
  resolutionStatus?: InlineCommentResolutionStatus;
  properties?: InlineCommentProperties;
}
