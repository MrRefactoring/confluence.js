import type { z } from 'zod';
import { apiObject } from '#/core';

export const AccountIdEmailRecordArraySchema = apiObject({});

export type AccountIdEmailRecordArray = z.infer<typeof AccountIdEmailRecordArraySchema>;
