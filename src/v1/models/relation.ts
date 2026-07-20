import { z } from 'zod';
import { apiObject } from '#/core';
import { RelationDataSchema } from './relationData';
import { ContentSchema } from './content';
import { UserSchema } from './user';
import { SpaceSchema } from './space';
import { GenericLinksSchema } from './genericLinks';

export const RelationSchema = apiObject({
  name: z.string(),
  relationData: RelationDataSchema.optional(),
  source: z.union([ContentSchema, UserSchema, SpaceSchema]).optional(),
  target: z.union([ContentSchema, UserSchema, SpaceSchema]).optional(),
  _expandable: apiObject({
    relationData: z.string().optional(),
    source: z.string().optional(),
    target: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema,
});

export type Relation = z.infer<typeof RelationSchema>;
