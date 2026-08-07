import type { z } from 'zod';
import { openEnum } from '#/core';
/** The account type of the user. */

export const AccountTypeSchema = openEnum(['atlassian', 'app', 'customer', 'unknown']);

export type AccountType = z.infer<typeof AccountTypeSchema>;
