import { OnlyArchivedAndCurrentContentStatus } from './onlyArchivedAndCurrentContentStatus';

export interface ChildPage {
  /** ID of the page. */
  id?: number;
  status?: OnlyArchivedAndCurrentContentStatus;
  /** Title of the page. */
  title?: string;
  /** ID of the space the page is in. */
  spaceId?: number;
  /** Position of child page within the given parent page tree. */
  childPosition?: number;
}
