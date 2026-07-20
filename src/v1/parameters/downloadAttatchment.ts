import { z } from 'zod';

export const DownloadAttatchmentSchema = z.object({
  /** The ID of the content that the attachment is attached to. */
  id: z.string(),
  /** The ID of the attachment to download. */
  attachmentId: z.string(),
  /**
   * The version of the attachment. If this parameter is absent, the redirect URI will download the latest version of
   * the attachment.
   */
  version: z.number().optional(),
  /** The statuses allowed on the retrieved attachment. If this parameter is absent, it will default to `current`. */
  status: z.array(z.string()).optional(),
});

export type DownloadAttatchment = z.input<typeof DownloadAttatchmentSchema>;
