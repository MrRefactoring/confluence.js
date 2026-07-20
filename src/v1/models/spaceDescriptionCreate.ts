import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * The description of the new/updated space. Note, only the 'plain' representation* can be used for the description when
 * creating or updating a space.
 */

export const SpaceDescriptionCreateSchema = apiObject({
  plain: apiObject({
    /** The space description. */
    value: z.string().optional(),
    /** Set to 'plain'. */
    representation: z.string().optional(),
  }),
});

export type SpaceDescriptionCreate = z.infer<typeof SpaceDescriptionCreateSchema>;
