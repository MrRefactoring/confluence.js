import { z } from 'zod';
import { apiObject } from '#/core';
import { OnlyArchivedAndCurrentContentStatusSchema } from './onlyArchivedAndCurrentContentStatus';

export const ChildrenSchema = apiObject({
  /** ID of the child content. */
  id: z.string().optional(),
  status: OnlyArchivedAndCurrentContentStatusSchema.optional(),
  /** Title of the child content. */
  title: z.string().optional(),
  /** Hierarchical content type (database/embed/folder/page/whiteboard). */
  type: z.string().optional(),
  /** ID of the space the content is in. */
  spaceId: z.string().optional(),
  /**
   * Numerical value indicating position of the content relative to its siblings (with the same parentId) within the
   * content tree. If the content is sorted by childPosition, it will reflect the default content ordering within the
   * content tree.
   */
  childPosition: z.number().nullish(),
});

export type Children = z.infer<typeof ChildrenSchema>;
