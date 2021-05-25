export interface Spaces {
  /** A list of space keys */
  spaceKey?: string;
  /** Filter the list of spaces returned by type (global, personal) */
  type?: string;
  /** Filter the list of spaces returned by status (current, archived) */
  status?: string;
  /** Filter the list of spaces returned by label */
  label?: string;
  /** Filter the list of spaces returned by favourites */
  favourite?: boolean;
  /** A comma separated list of properties to expand on the spaces */
  expand?: string;
  /** The start point of the collection to return */
  start?: number;
  /** The limit of the number of spaces to return, this may be restricted by fixed system limits */
  limit?: number;
}
