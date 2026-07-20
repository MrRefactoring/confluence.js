import { z } from 'zod';

export const GetPageContentPropertiesByIdSchema = z.object({
  /** The ID of the page for which content properties should be returned. */
  pageId: z.number(),
  /** The ID of the content property being requested. */
  propertyId: z.number(),
});

export type GetPageContentPropertiesById = z.input<typeof GetPageContentPropertiesByIdSchema>;
