import { ContentStatus } from './contentStatus';
import { Version } from './version';

export interface Attachment {
  /** ID of the attachment. */
  id?: string;
  status?: ContentStatus;
  /** Title of the comment. */
  title?: string;
  /**
   * ID of the containing page.
   *
   * Note: This is only returned if the attachment has a container that is a page.
   *

   */
  pageId?: {};
  /**
   * ID of the containing blog post.
   *
   * Note: This is only returned if the attachment has a container that is a blog post.
   *

   */
  blogPostId?: {};
  /**
   * ID of the containing custom content.
   *
   * Note: This is only returned if the attachment has a container that is custom content.
   *

   */
  customContentId?: {};
  /** Media Type for the attachment. */
  mediaType?: string;
  /** Media Type description for the attachment. */
  mediaTypeDescription?: string;
  /** Comment for the attachment. */
  comment?: string;
  /** File size of the attachment. */
  fileSize?: number;
  /** WebUI link of the attachment. */
  webuiLink?: string;
  /** Download link of the attachment. */
  downloadLink?: string;
  version?: Version;
}
