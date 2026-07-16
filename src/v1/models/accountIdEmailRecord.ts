import { z } from 'zod';
import { apiObject } from '#/core';

export const AccountIdEmailRecordSchema = apiObject({
  accountId: z.string(),
  email: z.string(),
});

export type AccountIdEmailRecord = z.infer<typeof AccountIdEmailRecordSchema>;
