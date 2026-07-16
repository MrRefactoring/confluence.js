import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupSchema } from './group';
import { GenericLinksSchema } from './genericLinks';
/** Same as GroupArray but with `_links` property. */

export const GroupArrayWithLinksSchema = apiObject({
  results: z.array(GroupSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  /**
   * This property will return total count of the objects before pagination is applied. This value is returned if
   * `shouldReturnTotalSize` is set to `true`.
   */
  totalSize: z.number().optional(),
  _links: GenericLinksSchema,
});

export type GroupArrayWithLinks = z.infer<typeof GroupArrayWithLinksSchema>;
