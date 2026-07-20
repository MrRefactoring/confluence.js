import { z } from 'zod';
import { CopyPageHierarchyRequestSchema } from '../models';

export const CopyPageHierarchySchema = z
  .object({
    id: z.string(),
  })
  .extend(CopyPageHierarchyRequestSchema.shape);

export type CopyPageHierarchy = z.input<typeof CopyPageHierarchySchema>;
