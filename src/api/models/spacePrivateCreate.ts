import { SpaceDescriptionCreate } from './spaceDescriptionCreate';

/**
 * This is the request object used when creating a new private space. */
export interface SpacePrivateCreate {
  /** The key for the new space. Format: See [Space
    keys](https://confluence.atlassian.com/x/lqNMMQ). */
  key: string;
  /** The name of the new space. */
  name: string;
  description?: SpaceDescriptionCreate;
}
