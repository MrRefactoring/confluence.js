import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdatePagePropertyByIdSchema = z.object({}).extend(ContentPropertyUpdateSchema.shape).extend({
  /** The ID of the page the property belongs to. */
  pageId: z.number(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdatePagePropertyById = z.input<typeof UpdatePagePropertyByIdSchema>;
