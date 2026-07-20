import { z } from 'zod';

export const GetPageClassificationLevelSchema = z.object({
  /** The ID of the page for which classification level should be returned. */
  id: z.number(),
  /** Status of page from which classification level will fetched. */
  status: z.enum(['current', 'draft', 'archived']).optional(),
});

export type GetPageClassificationLevel = z.input<typeof GetPageClassificationLevelSchema>;
