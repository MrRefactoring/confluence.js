import { z } from 'zod';
import { BulkAssignRolesSchema } from '../models/index.js';

export const BulkAssignSpacePermissionRolesSchema = z.object({}).extend(BulkAssignRolesSchema.shape);

export type BulkAssignSpacePermissionRoles = z.input<typeof BulkAssignSpacePermissionRolesSchema>;
