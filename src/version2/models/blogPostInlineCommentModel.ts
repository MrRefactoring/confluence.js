import { Body } from './body';
import { Version } from './version';

export interface BlogPostInlineCommentModel {
  /** ID of the comment. */
  id: number;
  /** The status of the content. */
  status: 'current' | 'trashed' | 'historical' | 'deleted' | 'any' | 'draft' | 'archived' | string;
  /** Title of the comment. */
  title: string;
  /** ID of the blog post the comment is in. */
  blogPostId: number;
  version: Version;
  /** Contains fields for each representation type requested. */
  body: Body;
}
