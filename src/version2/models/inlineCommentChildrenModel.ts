import { Body } from './body';
import { Version } from './version';

export interface InlineCommentChildrenModel {
  /** ID of the comment. */
  id: number;
  /** The status of the content. */
  status: 'current' | 'trashed' | 'historical' | 'deleted' | 'any' | 'draft' | 'archived' | string;
  /** Title of the comment. */
  title: string;
  /** ID of the parent comment the child comment is in. */
  parentCommentId: number;
  version: Version;
  /** Contains fields for each representation type requested. */
  body: Body;
}
