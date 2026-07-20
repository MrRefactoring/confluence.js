import { z } from 'zod';
/** The account type of the user. */

export const AccountTypeSchema = z.enum(['atlassian', 'app', 'customer', 'unknown']);

export type AccountType = z.infer<typeof AccountTypeSchema>;
