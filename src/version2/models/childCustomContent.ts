import { OnlyArchivedAndCurrentContentStatus } from './onlyArchivedAndCurrentContentStatus';

export interface ChildCustomContent {
  /** ID of the child custom content. */
  id?: number;
  status?: OnlyArchivedAndCurrentContentStatus;
  /** Title of the custom content. */
  title?: string;
  /** Custom content type. */
  type?: string;
  /** ID of the space the custom content is in. */
  spaceId?: number;
}
