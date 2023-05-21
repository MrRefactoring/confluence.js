import { OnlyArchivedAndCurrentContentStatus } from './onlyArchivedAndCurrentContentStatus';

export interface ChildPage {
  /** ID of the page. */
  id?: {};
  status?: OnlyArchivedAndCurrentContentStatus;
  /** Title of the page. */
  title?: string;
  /** ID of the space the page is in. */
  spaceId?: {};
  /** Position of child page within the given parent page tree. */
  childPosition?: number;
}
