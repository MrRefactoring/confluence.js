import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
/**
 * This object represents an icon. If used as a profilePicture, this may be returned as null, depending on the user's
 * privacy setting.
 */

export const IconSchema = apiObject({
  path: z.string(),
  isDefault: z.boolean(),
});

export type Icon = z.infer<typeof IconSchema>;
