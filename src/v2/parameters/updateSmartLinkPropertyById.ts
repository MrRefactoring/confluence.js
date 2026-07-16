import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdateSmartLinkPropertyByIdSchema = z
  .object({
    /** The ID of the Smart Link in the content tree the property belongs to. */
    embedId: z.number(),
    /** The ID of the property to be updated. */
    propertyId: z.number(),
  })
  .extend(ContentPropertyUpdateSchema.shape);

export type UpdateSmartLinkPropertyById = z.input<typeof UpdateSmartLinkPropertyByIdSchema>;
