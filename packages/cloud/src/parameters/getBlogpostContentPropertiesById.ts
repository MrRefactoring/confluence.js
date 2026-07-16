import { z } from 'zod';

export const GetBlogpostContentPropertiesByIdSchema = z.object({
  /** The ID of the blog post for which content properties should be returned. */
  blogpostId: z.number(),
  /** The ID of the property being requested */
  propertyId: z.number(),
});

export type GetBlogpostContentPropertiesById = z.input<typeof GetBlogpostContentPropertiesByIdSchema>;
