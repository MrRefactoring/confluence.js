import { Body } from './body';
import { ContentStatus } from './contentStatus';
import { Version } from './version';

export interface Page {
  /** ID of the page. */
  id?: number;
  status?: ContentStatus;
  /** Title of the page. */
  title?: string;
  /** ID of the space the page is in. */
  spaceId?: number;
  /** ID of the parent page, or null if there is no parent page. */
  parentId?: number;
  /** The account ID of the user who created this page originally. */
  authorId?: string;
  /** Date and time when the page was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt?: string;
  version?: Version;
  body?: Body;
}
