import { z } from 'zod';
import { ContentPropertyUpdateSchema } from '../models';

export const UpdateCustomContentPropertyByIdSchema = z.object(ContentPropertyUpdateSchema.shape).extend({
  /** The ID of the custom content the property belongs to. */
  customContentId: z.number(),
  /** The ID of the property to be updated. */
  propertyId: z.number(),
});

export type UpdateCustomContentPropertyById = z.input<typeof UpdateCustomContentPropertyByIdSchema>;
