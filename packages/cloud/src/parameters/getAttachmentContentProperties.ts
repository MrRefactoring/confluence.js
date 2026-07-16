import { z } from 'zod';
import { ContentPropertySortOrderSchema } from '../models/index.js';

export const GetAttachmentContentPropertiesSchema = z.object({
  /** The ID of the attachment for which content properties should be returned. */
  attachmentId: z.string(),
  /** Filters the response to return a specific content property with matching key (case sensitive). */
  key: z.string().optional(),
  /** Used to sort the result by a particular field. */
  sort: ContentPropertySortOrderSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of attachments per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetAttachmentContentProperties = z.input<typeof GetAttachmentContentPropertiesSchema>;
