import { z } from 'zod';
import { AttachmentSortOrderSchema } from '../models';

export const GetLabelAttachmentsSchema = z.object({
  /** The ID of the label for which attachments should be returned. */
  id: z.number(),
  /** Used to sort the result by a particular field. */
  sort: AttachmentSortOrderSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of pages per result to return. If more results exist, use the `Link` header to retrieve a relative
   * URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetLabelAttachments = z.input<typeof GetLabelAttachmentsSchema>;
