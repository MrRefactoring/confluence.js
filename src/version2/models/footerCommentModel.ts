import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { Version } from './version';

export interface FooterCommentModel {
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
}
