import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentRestrictionUpdateSchema } from './contentRestrictionUpdate';
import { GenericLinksSchema } from './genericLinks';

export const ContentRestrictionAddOrUpdateArraySchema = z.union([
  apiObject({
    results: z.array(ContentRestrictionUpdateSchema),
    start: z.number().optional(),
    limit: z.number().optional(),
    size: z.number().optional(),
    /** This property is used by the UI to figure out whether a set of restrictions has changed. */
    restrictionsHash: z.string().optional(),
    _links: GenericLinksSchema.optional(),
  }),
  z.array(ContentRestrictionUpdateSchema),
]);

export type ContentRestrictionAddOrUpdateArray = z.infer<typeof ContentRestrictionAddOrUpdateArraySchema>;
