import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { OnlyArchivedAndCurrentContentStatusSchema } from '#/models/onlyArchivedAndCurrentContentStatus';

export const ChildPageSchema = apiObject({
  /** ID of the page. */
  id: z.string().optional(),
  status: OnlyArchivedAndCurrentContentStatusSchema.optional(),
  /** Title of the page. */
  title: z.string().optional(),
  /** ID of the space the page is in. */
  spaceId: z.string().optional(),
  /** Position of child page within the given parent page tree. */
  childPosition: z.number().nullish(),
});

export type ChildPage = z.infer<typeof ChildPageSchema>;
