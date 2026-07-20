import { z } from 'zod';

export const GetAttachmentVersionDetailsSchema = z.object({
  /** The ID of the attachment for which version details should be returned. */
  attachmentId: z.string(),
  /** The version number of the attachment to be returned. */
  versionNumber: z.number(),
});

export type GetAttachmentVersionDetails = z.input<typeof GetAttachmentVersionDetailsSchema>;
