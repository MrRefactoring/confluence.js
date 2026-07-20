import { z } from 'zod';
import { apiObject } from '#/core';

export const AdminKeySchema = apiObject({
  /** User identifier. */
  accountId: z.string().optional(),
  /** Timestamp in UTC that represents when the admin key will expire. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  expirationTime: z.coerce.date().optional(),
});

export type AdminKey = z.infer<typeof AdminKeySchema>;
