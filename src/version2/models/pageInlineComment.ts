import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { InlineCommentProperties } from './inlineCommentProperties';
import { InlineCommentResolutionStatus } from './inlineCommentResolutionStatus';
import { Version } from './version';

export interface PageInlineComment {
  /** ID of the comment. */
  id?: {};
  status?: ContentStatus;
  /** Title of the comment. */
  title?: string;
  /** ID of the page the comment is in. */
  pageId?: {};
  version?: Version;
  body?: Body;
  resolutionStatus?: InlineCommentResolutionStatus;
  properties?: InlineCommentProperties;
}
