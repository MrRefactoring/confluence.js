import { z } from 'zod';
import { ContentPermissionRequestSchema } from '../models';

export const CheckContentPermissionSchema = z
  .object({
    /** The ID of the content to check permissions against. */
    id: z.string(),
  })
  .extend(ContentPermissionRequestSchema.shape);

export type CheckContentPermission = z.input<typeof CheckContentPermissionSchema>;
