import { z } from 'zod';
import { AttachmentSortOrderSchema } from '../models/index.js';

export const GetAttachmentsSchema = z.object({
  /** Used to sort the result by a particular field. */
  sort: AttachmentSortOrderSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /** Filter the results to attachments based on their status. By default, `current` and `archived` are used. */
  status: z.array(z.enum(['current', 'archived', 'trashed'])).optional(),
  /** Filters on the mediaType of attachments. Only one may be specified. */
  mediaType: z.string().optional(),
  /** Filters on the file-name of attachments. Only one may be specified. */
  filename: z.string().optional(),
  /**
   * Maximum number of attachments per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetAttachments = z.input<typeof GetAttachmentsSchema>;
