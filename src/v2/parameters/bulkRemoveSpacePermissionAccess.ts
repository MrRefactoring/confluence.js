import { z } from 'zod';
import { BulkRemoveAccessSchema } from '../models';

export const BulkRemoveSpacePermissionAccessSchema = z.object({}).extend(BulkRemoveAccessSchema.shape);

export type BulkRemoveSpacePermissionAccess = z.input<typeof BulkRemoveSpacePermissionAccessSchema>;
