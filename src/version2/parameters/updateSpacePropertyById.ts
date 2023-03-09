import { SpacePropertyUpdateRequest } from '../models';

export interface UpdateSpacePropertyById extends SpacePropertyUpdateRequest {
  /** The ID of the space the property belongs to. */
  'space-id': number;
  /** The ID of the property to be updated. */
  'property-id': number;
}
