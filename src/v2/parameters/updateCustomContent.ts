import { z } from 'zod';

export const UpdateCustomContentSchema = z.object({
  /**
   * The ID of the custom content to be updated. If you don't know the custom content ID, use Get Custom Content by Type
   * and filter the results.
   */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type UpdateCustomContent = z.input<typeof UpdateCustomContentSchema>;
