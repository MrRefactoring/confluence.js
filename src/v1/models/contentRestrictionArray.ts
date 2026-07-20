import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentRestrictionSchema } from './contentRestriction';
import { GenericLinksSchema } from './genericLinks';

export const ContentRestrictionArraySchema = apiObject({
  results: z.array(ContentRestrictionSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  /** This property is used by the UI to figure out whether a set of restrictions has changed. */
  restrictionsHash: z.string(),
  _links: GenericLinksSchema,
});

export type ContentRestrictionArray = z.infer<typeof ContentRestrictionArraySchema>;
