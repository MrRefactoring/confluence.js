import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models/index.js';

export const CreateSmartLinkPropertySchema = z
  .object({
    /** The ID of the Smart Link in the content tree to create a property for. */
    id: z.number(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreateSmartLinkProperty = z.input<typeof CreateSmartLinkPropertySchema>;
