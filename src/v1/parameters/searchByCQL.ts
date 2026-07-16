import { z } from 'zod';

export const SearchByCQLSchema = z.object({
  /**
   * The CQL query to be used for the search. See [Advanced Searching using
   * CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/) for instructions on how to
   * build a CQL query.
   */
  cql: z.string(),
  /**
   * The space, content, and content status to execute the search against.
   *
   * - `spaceKey` Key of the space to search against. Optional.
   * - `contentId` ID of the content to search against. Optional. Must be in the space specified by `spaceKey`.
   * - `contentStatuses` Content statuses to search against. Optional.
   *
   * Specify these values in an object. For example, `cqlcontext={%22spaceKey%22:%22TEST%22, %22contentId%22:%22123%22}`
   */
  cqlcontext: z.string().optional(),
  /** Pointer to a set of search results, returned as part of the `next` or `prev` URL from the previous search call. */
  cursor: z.string().optional(),
  next: z.boolean().optional(),
  prev: z.boolean().optional(),
  /** The maximum number of content objects to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
  /** The start point of the collection to return */
  start: z.number().optional(),
  /** Whether to include content from archived spaces in the results. */
  includeArchivedSpaces: z.boolean().optional(),
  /** Whether to exclude current spaces and only show archived spaces. */
  excludeCurrentSpaces: z.boolean().optional(),
  /** The excerpt strategy to apply to the result */
  excerpt: z.enum(['highlight', 'indexed', 'none', 'highlight_unescaped', 'indexed_unescaped']).optional(),
  /**
   * Filters users by permission type. Use `none` to default to licensed users, `externalCollaborator` for
   * external/guest users, and `all` to include all permission types.
   */
  sitePermissionTypeFilter: z.enum(['all', 'externalCollaborator', 'none']).optional(),
  _: z.number().optional(),
  expand: z.array(z.string()).optional(),
});

export type SearchByCQL = z.input<typeof SearchByCQLSchema>;
