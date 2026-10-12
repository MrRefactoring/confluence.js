import { z } from 'zod';
import { CopyPageHierarchyRequestSchema } from '../models';

export const CopyPageHierarchySchema = z.object(CopyPageHierarchyRequestSchema.shape).extend({
  id: z.string(),
});

export type CopyPageHierarchy = z.input<typeof CopyPageHierarchySchema>;
