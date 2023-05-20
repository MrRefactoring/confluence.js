import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { Version } from './version';

export interface PageCommentModel {
  /** ID of the comment. */
  id?: {};
  status?: ContentStatus;
  /** Title of the comment. */
  title?: string;
  /** ID of the page the comment is in. */
  pageId?: {};
  version?: Version;
  body?: Body;
}
