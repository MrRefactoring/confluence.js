import { z } from 'zod';

export const RemoveTemplateSchema = z.object({
  /** The ID of the template to be deleted. */
  contentTemplateId: z.string(),
});

export type RemoveTemplate = z.input<typeof RemoveTemplateSchema>;
