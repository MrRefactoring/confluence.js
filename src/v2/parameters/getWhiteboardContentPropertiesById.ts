import { z } from 'zod';

export const GetWhiteboardContentPropertiesByIdSchema = z.object({
  /** The ID of the whiteboard for which content properties should be returned. */
  whiteboardId: z.number(),
  /** The ID of the content property being requested. */
  propertyId: z.number(),
});

export type GetWhiteboardContentPropertiesById = z.input<typeof GetWhiteboardContentPropertiesByIdSchema>;
