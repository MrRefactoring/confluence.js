import { z } from 'zod';

export const GetAttachmentOperationsSchema = z.object({
  /** The ID of the attachment for which operations should be returned. */
  id: z.string(),
});

export type GetAttachmentOperations = z.input<typeof GetAttachmentOperationsSchema>;
