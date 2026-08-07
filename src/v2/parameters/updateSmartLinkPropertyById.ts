import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdateSmartLinkPropertyByIdSchema = z.object({}).extend(ContentPropertyUpdateSchema.shape).extend({
  /** The ID of the Smart Link in the content tree the property belongs to. */
  embedId: z.number(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdateSmartLinkPropertyById = z.input<typeof UpdateSmartLinkPropertyByIdSchema>;
