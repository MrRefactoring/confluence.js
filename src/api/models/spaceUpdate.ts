import type { SpaceDescriptionCreate } from './spaceDescriptionCreate';

export interface SpaceUpdate {
  /** The name of the space. */
  name?: string;
  description?: SpaceDescriptionCreate;
  /** The page to set as the homepage of the space. */
  homepage?: {
    /** The ID of the page. */
    id: string;
  };
  /** The updated type for this space. */
  type?: string;
  /** The updated status for this space. */
  status?: string;
}
