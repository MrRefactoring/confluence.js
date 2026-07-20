import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateWhiteboardPropertySchema = z
  .object({
    /** The ID of the whiteboard to create a property for. */
    id: z.number(),
  })
  .extend(ContentPropertyCreateSchema.shape);

export type CreateWhiteboardProperty = z.input<typeof CreateWhiteboardPropertySchema>;
