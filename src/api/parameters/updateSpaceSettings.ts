import type { SpaceSettingsUpdate } from '../models';

export interface UpdateSpaceSettings extends SpaceSettingsUpdate {
  /** The key of the space whose settings will be updated. */
  spaceKey: string;
}
