import { z } from 'zod';
import { ContentRestrictionAddOrUpdateArraySchema } from '../models';

export const AddRestrictionsSchema = z.object({
  /** The ID of the content to add restrictions to. */
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
  body: ContentRestrictionAddOrUpdateArraySchema,
});

export type AddRestrictions = z.input<typeof AddRestrictionsSchema>;
