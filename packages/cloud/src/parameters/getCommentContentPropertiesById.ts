import { z } from 'zod';

export const GetCommentContentPropertiesByIdSchema = z.object({
  /** The ID of the comment for which content properties should be returned. */
  commentId: z.number(),
  /** The ID of the content property being requested. */
  propertyId: z.number(),
});

export type GetCommentContentPropertiesById = z.input<typeof GetCommentContentPropertiesByIdSchema>;
