import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { Version } from './version';

export interface ChildrenCommentModel {
  /** ID of the comment. */
  id?: number;
  status?: ContentStatus;
  /** Title of the comment. */
  title?: string;
  /** ID of the parent comment the child comment is in. */
  parentCommentId?: number;
  version?: Version;
  /** Contains representations of the comment's body in different formats. */
  body?: Body;
}
