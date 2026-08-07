import type { z } from 'zod';
import { openEnum } from '#/core';
/** The account status of the user. */

export const AccountStatusSchema = openEnum(['active', 'inactive', 'closed', 'unknown']);

export type AccountStatus = z.infer<typeof AccountStatusSchema>;
