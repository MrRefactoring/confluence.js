import { z } from 'zod';
import { BulkAssignRolesSchema } from '../models';

export const BulkAssignSpacePermissionRolesSchema = z.object(BulkAssignRolesSchema.shape);

export type BulkAssignSpacePermissionRoles = z.input<typeof BulkAssignSpacePermissionRolesSchema>;
