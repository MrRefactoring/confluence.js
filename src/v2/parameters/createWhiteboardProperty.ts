import { z } from 'zod';
import { ContentPropertyCreateSchema } from '../models';

export const CreateWhiteboardPropertySchema = z.object({}).extend(ContentPropertyCreateSchema.shape).extend({
  /** The ID of the whiteboard to create a property for. */
  id: z.number(),
});

export type CreateWhiteboardProperty = z.input<typeof CreateWhiteboardPropertySchema>;
