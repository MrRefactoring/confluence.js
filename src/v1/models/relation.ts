import { z } from 'zod';
import { apiObject } from '#/core';
import { RelationDataSchema } from './relationData';
import { ContentSchema, type Content, type ContentInput } from './content';
import { UserSchema, type User, type UserInput } from './user';
import { SpaceSchema, type Space, type SpaceInput } from './space';
import { GenericLinksSchema } from './genericLinks';

export const RelationSchema = apiObject({
  name: z.string(),
  relationData: RelationDataSchema.optional(),
  source: z
    .union([
      ContentSchema as z.ZodType<Content, ContentInput>,
      UserSchema as z.ZodType<User, UserInput>,
      SpaceSchema as z.ZodType<Space, SpaceInput>,
    ])
    .optional(),
  target: z
    .union([
      ContentSchema as z.ZodType<Content, ContentInput>,
      UserSchema as z.ZodType<User, UserInput>,
      SpaceSchema as z.ZodType<Space, SpaceInput>,
    ])
    .optional(),
  _expandable: apiObject({
    relationData: z.string().optional(),
    source: z.string().optional(),
    target: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema,
});

export type Relation = z.infer<typeof RelationSchema>;
