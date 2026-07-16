import { z } from 'zod';

export const DeleteRestrictionsSchema = z.object({
  /** The ID of the content to remove restrictions from. */
  id: z.string(),
  /**
   * A multi-value parameter indicating which properties of the content restrictions (returned in response) to expand.
   *
   * - `restrictions.user` returns the piece of content that the restrictions are applied to. Expanded by default.
   * - `restrictions.group` returns the piece of content that the restrictions are applied to. Expanded by default.
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
});

export type DeleteRestrictions = z.input<typeof DeleteRestrictionsSchema>;
