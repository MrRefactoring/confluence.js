import { SpaceDescription } from './spaceDescription';
import { SpaceStatus } from './spaceStatus';
import { SpaceType } from './spaceType';

export interface Space {
  /** ID of the space. */
  id: string;
  /** Key of the space. */
  key: string;
  /** Name of the space. */
  name: string;
  /**
   * The type of the space, which determines its purpose and functionality. For example, it might be `personal` or
   * `global`.
   */
  type: SpaceType;
  /** The current status of the space, for example, `current`, `archived`. */
  status: SpaceStatus;
  /** ID of the space's homepage. */
  homepageId: string;
  /** The description of the space. Currently set to null, but might be used for additional information in the future. */
  description: SpaceDescription | null;
  /**
   * The icon associated with the space. Currently set to null, but might be used to set a custom space icon in the
   * future.
   */
  icon: null;
  /** The timestamp indicating when the space was created. */
  createdAt: string; // todo make type a Date
}
