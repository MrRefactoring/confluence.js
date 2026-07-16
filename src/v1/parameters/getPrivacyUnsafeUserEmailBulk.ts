import { z } from 'zod';

export const GetPrivacyUnsafeUserEmailBulkSchema = z.object({
  /** The account IDs of the users. */
  accountId: z.array(z.string()),
});

export type GetPrivacyUnsafeUserEmailBulk = z.input<typeof GetPrivacyUnsafeUserEmailBulkSchema>;
