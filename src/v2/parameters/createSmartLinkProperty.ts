import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateSmartLinkPropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the Smart Link in the content tree to create a property for. */
  id: z.number(),
});

export type CreateSmartLinkProperty = z.input<typeof CreateSmartLinkPropertySchema>;
