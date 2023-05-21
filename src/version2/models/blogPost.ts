import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { Version } from './version';

export interface BlogPost {
  /** ID of the blog post. */
  id?: {};
  status?: ContentStatus;
  /** Title of the blog post. */
  title?: string;
  /** ID of the space the blog post is in. */
  spaceId?: {};
  /** The account ID of the user who created this blog post originally. */
  authorId?: string;
  /** Date and time when the blog post was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt?: string;
  version?: Version;
  body?: Body;
}
