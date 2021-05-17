/**
 * The description of the new/updated space. Note, only the 'plain' representation* can be used for the description when
 * creating or updating a space.
 */
export interface SpaceDescriptionCreate {
  plain: {
    /** The space description. */
    value?: string;
    /** Set to 'plain'. */
    representation?: string;
  };
}
