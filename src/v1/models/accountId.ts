import { z } from 'zod';
import { apiObject } from '#/core';

export const AccountIdSchema = apiObject({
  accountId: z.string(),
});

export type AccountId = z.infer<typeof AccountIdSchema>;
