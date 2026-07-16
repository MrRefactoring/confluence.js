import { z } from 'zod';

export const GetRestrictionsSchema = z.object({
  /** The ID of the content to be queried for its restrictions. */
  id: z.string(),
  /**
   * A multi-value parameter indicating which properties of the content restrictions to expand. By default, the
   * following objects are expanded: `restrictions.user`, `restrictions.group`.
   *
   * - `restrictions.user` returns the piece of content that the restrictions are applied to.
   * - `restrictions.group` returns the piece of content that the restrictions are applied to.
   * - `content` returns the piece of content that the restrictions are applied to.
   */
  expand: z
    .array(
      z.enum([
        'restrictions.user',
        'read.restrictions.user',
        'update.restrictions.user',
        'restrictions.group',
        'read.restrictions.group',
        'update.restrictions.group',
        'content',
      ]),
    )
    .optional(),
  /** The starting index of the users and groups in the returned restrictions. */
  start: z.number().optional(),
  /**
   * The maximum number of users and the maximum number of groups, in the returned restrictions, to return per page.
   * Note, this may be restricted by fixed system limits.
   */
  limit: z.number().optional(),
});

export type GetRestrictions = z.input<typeof GetRestrictionsSchema>;
