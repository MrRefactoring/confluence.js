import { Body } from './body';
import { InlineCommentProperties } from './inlineCommentProperties';
import { InlineCommentResolutionStatus } from './inlineCommentResolutionStatus';
import { Version } from './version';

export interface InlineCommentChildren {
  /** ID of the comment. */
  id?: {};
  status: 'current' | 'trashed' | 'historical' | 'deleted' | 'any' | 'draft' | 'archived' | string;
  /** Title of the comment. */
  title?: string;
  /** ID of the parent comment the child comment is in. */
  parentCommentId?: {};
  version?: Version;
  body?: Body;
  resolutionStatus?: InlineCommentResolutionStatus;
  properties?: InlineCommentProperties;
}
