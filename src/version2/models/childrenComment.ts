import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { Version } from './version';

export interface ChildrenComment {
  /** ID of the comment. */
  id?: {};
  status?: ContentStatus;
  /** Title of the comment. */
  title?: string;
  /** ID of the parent comment the child comment is in. */
  parentCommentId?: {};
  version?: Version;
  body?: Body;
}
