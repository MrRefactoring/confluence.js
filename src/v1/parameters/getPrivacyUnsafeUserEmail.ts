import { z } from 'zod';

export const GetPrivacyUnsafeUserEmailSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`. Required.
   */
  accountId: z.string(),
});

export type GetPrivacyUnsafeUserEmail = z.input<typeof GetPrivacyUnsafeUserEmailSchema>;
