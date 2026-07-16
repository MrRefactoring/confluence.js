import { z } from 'zod';

export const GetAttachmentThumbnailByIdSchema = z.object({
  /**
   * The ID of the attachment to be returned. If you don't know the attachment's ID, use Get attachments for
   * page/blogpost/custom content.
   */
  id: z.string(),
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version: z.number().optional(),
  /** Allows you to define the thumbnail height. */
  height: z.number().optional(),
  /** Allows you to define the thumbnail width. */
  width: z.number().optional(),
});

export type GetAttachmentThumbnailById = z.input<typeof GetAttachmentThumbnailByIdSchema>;
