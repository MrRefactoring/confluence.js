export interface GetThemes {
  /** The starting index of the returned themes. */
  start?: number;
  /** The maximum number of themes to return per page.
    Note, this may be restricted by fixed system limits. */
  limit?: number;
}
