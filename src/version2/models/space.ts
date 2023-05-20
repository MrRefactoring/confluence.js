import { SpaceDescription } from './spaceDescription';
import { SpaceStatus } from './spaceStatus';
import { SpaceType } from './spaceType';

export interface Space {
  /** ID of the space. */
  id?: {};
  /** Key of the space. */
  key?: string;
  /** Name of the space. */
  name?: string;
  type?: SpaceType;
  status?: SpaceStatus;
  /** ID of the space's homepage. */
  homepageId?: {};
  description?: SpaceDescription;
}
