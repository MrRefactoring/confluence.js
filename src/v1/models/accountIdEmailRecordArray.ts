import { z } from 'zod';
import { AccountIdEmailRecordSchema } from './accountIdEmailRecord';

export const AccountIdEmailRecordArraySchema = z.array(AccountIdEmailRecordSchema);

export type AccountIdEmailRecordArray = z.infer<typeof AccountIdEmailRecordArraySchema>;
