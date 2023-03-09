import { SpacePropertyCreateRequest } from '../models';

export interface CreateSpaceProperty extends SpacePropertyCreateRequest {
  /** The ID of the space for which space properties should be returned. */
  'space-id': number;
}
