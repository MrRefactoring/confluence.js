import { z } from 'zod';
import { apiObject } from '#/core';
import { OnlyArchivedAndCurrentContentStatusSchema } from './onlyArchivedAndCurrentContentStatus';

export const DescendantsSchema = apiObject({
  /** ID of the descendant. */
  id: z.string().optional(),
  status: OnlyArchivedAndCurrentContentStatusSchema.optional(),
  /** Title of the descendant. */
  title: z.string().optional(),
  /** Hierarchical content type (database/embed/folder/page/whiteboard). */
  type: z.string().optional(),
  /** ID of the parent content. */
  parentId: z.string().optional(),
  /** Depth of the descendant in the content tree relative to the content specified in the request. */
  depth: z.number().optional(),
  /**
   * Numerical value indicating position of the content relative to its siblings (with the same parentId) within the
   * content tree. If the content is sorted by childPosition, it will reflect the default content ordering within the
   * content tree.
   */
  childPosition: z.number().nullish(),
  lastModified: z.string().optional(),
});

export type Descendants = z.infer<typeof DescendantsSchema>;
