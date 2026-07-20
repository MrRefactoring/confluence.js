import { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentUpdateSchema = apiObject({
  /**
   * The attachment version. Set this to the current version number of the attachment. Note, the version number only
   * needs to be incremented when updating the actual attachment, not its properties.
   */
  version: apiObject({
    /** The version number. */
    number: z.number(),
  }),
  /** The ID of the attachment to be updated. */
  id: z.string(),
  /** Set this to `attachment`. */
  type: z.enum(['attachment']),
  /** The updated name of the attachment. */
  title: z.string().max(255, 'title must be at most 255 characters').optional(),
  metadata: apiObject({
    /** The media type of the attachment, e.g. 'img/jpg'. */
    mediaType: z.string().optional(),
    /** The comment for this update. */
    comment: z.string().optional(),
  }).optional(),
  /** The new content to attach the attachment to. */
  container: apiObject({
    /** The `id` of the parent content. */
    id: z.string(),
    /** The content type. You can only attach attachments to content of type: `page`, `blogpost`. */
    type: z.string(),
  }).optional(),
});

export type AttachmentUpdate = z.infer<typeof AttachmentUpdateSchema>;
