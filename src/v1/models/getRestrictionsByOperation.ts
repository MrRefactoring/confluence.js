import type { z } from 'zod';
import { apiObject } from '#/core';
import { ContentRestrictionSchema } from './contentRestriction';
import { GenericLinksSchema } from './genericLinks';

export const GetRestrictionsByOperationSchema = apiObject({
  read: ContentRestrictionSchema.optional(),
  update: ContentRestrictionSchema.optional(),
  _links: GenericLinksSchema.optional(),
});

export type GetRestrictionsByOperation = z.infer<typeof GetRestrictionsByOperationSchema>;
