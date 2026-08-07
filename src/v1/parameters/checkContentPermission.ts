import { z } from 'zod';
import { ContentPermissionRequestSchema } from '../models';

export const CheckContentPermissionSchema = z.object({}).extend(ContentPermissionRequestSchema.shape).extend({
  /** The ID of the content to check permissions against. */
  id: z.string(),
});

export type CheckContentPermission = z.input<typeof CheckContentPermissionSchema>;
