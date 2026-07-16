import { z } from 'zod';

export const MovePageSchema = z.object({
  /** The ID of the page to be moved */
  pageId: z.string(),
  /**
   * The position to move the page to relative to the target page:
   *
   * - `before` - move the page under the same parent as the target, before the target in the list of children
   * - `after` - move the page under the same parent as the target, after the target in the list of children
   * - `append` - move the page to be a child of the target
   */
  position: z.enum(['before', 'after', 'append']),
  /** The ID of the target page for this operation */
  targetId: z.string(),
});

export type MovePage = z.input<typeof MovePageSchema>;
