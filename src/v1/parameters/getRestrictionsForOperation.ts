import { z } from 'zod';

export const GetRestrictionsForOperationSchema = z.object({
  /** The ID of the content to be queried for its restrictions. */
  id: z.string(),
  /** The operation type of the restrictions to be returned. */
  operationKey: z.enum(['read', 'update']),
  /**
   * A multi-value parameter indicating which properties of the content restrictions to expand.
   *
   * - `restrictions.user` returns the piece of content that the restrictions are applied to. Expanded by default.
   * - `restrictions.group` returns the piece of content that the restrictions are applied to. Expanded by default.
   * - `content` returns the piece of content that the restrictions are applied to.
   */
  expand: z.array(z.enum(['restrictions.user', 'restrictions.group', 'content'])).optional(),
  /** The starting index of the users and groups in the returned restrictions. */
  start: z.number().optional(),
  /**
   * The maximum number of users and the maximum number of groups, in the returned restrictions, to return per page.
   * Note, this may be restricted by fixed system limits.
   */
  limit: z.number().optional(),
});

export type GetRestrictionsForOperation = z.input<typeof GetRestrictionsForOperationSchema>;
