import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { Version } from './version';

export interface BlogPostCommentModel {
  /** ID of the comment. */
  id?: {};
  status?: ContentStatus;
  /** Title of the comment. */
  title?: string;
  /** ID of the blog post the comment is in. */
  blogPostId?: {};
  version?: Version;
  /** Contains representations of the comment's body in different formats. */
  body?: Body;
}
