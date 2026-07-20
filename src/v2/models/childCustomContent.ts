import { z } from 'zod';
import { apiObject } from '#/core';
import { OnlyArchivedAndCurrentContentStatusSchema } from './onlyArchivedAndCurrentContentStatus';

export const ChildCustomContentSchema = apiObject({
  /** ID of the child custom content. */
  id: z.string().optional(),
  status: OnlyArchivedAndCurrentContentStatusSchema.optional(),
  /** Title of the custom content. */
  title: z.string().optional(),
  /** Custom content type. */
  type: z.string().optional(),
  /** ID of the space the custom content is in. */
  spaceId: z.string().optional(),
});

export type ChildCustomContent = z.infer<typeof ChildCustomContentSchema>;
