export interface UpdateSpace {
  /** The key of the space to update. */
  spaceKey: string;
  /** The name of the space. */
  name?: string;
  description?: SpaceDescriptionCreate;
  /** The page to set as the homepage of the space. */
  homepage?: {
    /** The ID of the page. */
    id: string;
  };
}
