import { z } from 'zod';

export const SearchGroupsSchema = z.object({
  /** The search term used to query results. */
  query: z.string(),
  /** The starting index of the returned groups. */
  start: z.number().optional(),
  /** The maximum number of groups to return per page. Note, this is restricted to a maximum limit of 200 groups. */
  limit: z.number().optional(),
  /**
   * Whether to include total size parameter in the results. Note, fetching total size property is an expensive
   * operation; use it if your use case needs this value.
   */
  shouldReturnTotalSize: z.boolean().optional(),
});

export type SearchGroups = z.input<typeof SearchGroupsSchema>;
