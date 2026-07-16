import { z } from 'zod';
import { PrimaryBodyRepresentationSchema } from '../models';
import { CommentSortOrderSchema } from '../models';

export const GetAttachmentCommentsSchema = z.object({
  /** The ID of the attachment for which comments should be returned. */
  id: z.string(),
  /**
   * The content format type to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of comments per result to return. If more results exist, use the `Link` header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
  /** Used to sort the result by a particular field. */
  sort: CommentSortOrderSchema.optional(),
  /**
   * Version number of the attachment to retrieve comments for. If no version provided, retrieves comments for the
   * latest version.
   */
  version: z.number().optional(),
});

export type GetAttachmentComments = z.input<typeof GetAttachmentCommentsSchema>;
