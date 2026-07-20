import { z } from 'zod';

export const GetRestrictionsByOperationSchema = z.object({
  /** The ID of the content to be queried for its restrictions. */
  id: z.string(),
  /**
   * A multi-value parameter indicating which properties of the content restrictions to expand.
   *
   * - `restrictions.user` returns the piece of content that the restrictions are applied to. Expanded by default.
   * - `restrictions.group` returns the piece of content that the restrictions are applied to. Expanded by default.
   * - `content` returns the piece of content that the restrictions are applied to.
   */
  expand: z.array(z.enum(['restrictions.user', 'restrictions.group', 'content'])).optional(),
});

export type GetRestrictionsByOperation = z.input<typeof GetRestrictionsByOperationSchema>;
