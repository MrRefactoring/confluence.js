/** This is the request object used when creating a new private space. */
import { SpaceDescriptionCreate } from '../models';

export interface CreatePrivateSpace {
  /** The key for the new space. Format: See [Space keys](https://confluence.atlassian.com/x/lqNMMQ). */
  key: string;
  /** The name of the new space. */
  name: string;
  description?: SpaceDescriptionCreate;
}
