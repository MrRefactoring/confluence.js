import { z } from 'zod';
/** The account status of the user. */

export const AccountStatusSchema = z.enum(['active', 'inactive', 'closed', 'unknown']);

export type AccountStatus = z.infer<typeof AccountStatusSchema>;
