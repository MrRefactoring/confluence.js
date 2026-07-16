import { z } from 'zod';

export const GetSmartLinkOperationsSchema = z.object({
  /** The ID of the Smart Link in the content tree for which operations should be returned. */
  id: z.number(),
});

export type GetSmartLinkOperations = z.input<typeof GetSmartLinkOperationsSchema>;
