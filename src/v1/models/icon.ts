import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * This object represents an icon. If used as a profilePicture, this may be returned as null, depending on the user's
 * privacy setting.
 */

export const IconSchema = apiObject({
  path: z.string(),
  width: z.number(),
  height: z.number(),
  isDefault: z.boolean(),
});

export type Icon = z.infer<typeof IconSchema>;
