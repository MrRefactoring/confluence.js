import { ContentStatus } from './contentStatus';
import { CustomContentBody } from './customContentBody';
import { Version } from './version';

export interface CustomContent {
  /** ID of the custom content. */
  id?: {};
  /** The type of custom content. */
  type?: string;
  status?: ContentStatus;
  /** Title of the custom content. */
  title?: string;
  /**
   * ID of the space the custom content is in.
   *
   * Note: This is always returned, regardless of if the custom content has a container that is a space.
   */
  spaceId?: {};
  /**
   * ID of the containing page.
   *
   * Note: This is only returned if the custom content has a container that is a page.
   */
  pageId?: {};
  /**
   * ID of the containing blog post.
   *
   * Note: This is only returned if the custom content has a container that is a blog post.
   */
  blogPostId?: {};
  /**
   * ID of the containing custom content.
   *
   * Note: This is only returned if the custom content has a container that is custom content.
   */
  customContentId?: {};
  /** The account ID of the user who created this custom content originally. */
  authorId?: string;
  /** Date and time when the custom content was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt?: string;
  body?: CustomContentBody;
  version?: Version;
}
