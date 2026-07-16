import { z } from 'zod';

export const PostRedactPageSchema = z.object({
  /** The ID of the page to redact content from. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type PostRedactPage = z.input<typeof PostRedactPageSchema>;
