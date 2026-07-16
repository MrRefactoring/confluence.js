import { z } from 'zod';

export const GetContentDescendantsSchema = z.object({
  /** The ID of the content to be queried for its descendants. */
  id: z.string(),
  /**
   * A multi-value parameter indicating which properties of the children to expand, where:
   *
   * - `attachment` returns all attachments for the content.
   * - `comments` returns all comments for the content.
   * - `page` returns all child pages of the content.
   * - `whiteboard` returns all child whiteboards of the content.
   * - `database` returns all child databases of the content.
   * - `embed` returns all child embeds of the content.
   * - `folder` returns all child folders of the content.
   */
  expand: z.array(z.enum(['attachment', 'comment', 'page'])).optional(),
});

export type GetContentDescendants = z.input<typeof GetContentDescendantsSchema>;
