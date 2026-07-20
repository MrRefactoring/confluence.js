import { z } from 'zod';
import { apiObject } from '#/core';
import { UserArraySchema, type UserArray } from './userArray';
import { GroupArraySchema, type GroupArray } from './groupArray';
import { ContentSchema, type Content } from './content';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export type ContentRestriction = {
  operation:
    | 'administer'
    | 'copy'
    | 'create'
    | 'delete'
    | 'export'
    | 'move'
    | 'purge'
    | 'purge_version'
    | 'read'
    | 'restore'
    | 'update'
    | 'use';
  restrictions?: {
    user?: UserArray;
    group?: GroupArray;
    _expandable?: {
      user?: string;
      group?: string;
    };
  };
  content?: Content;
  _expandable: {
    restrictions?: string;
    content?: string;
  };
  _links: GenericLinks;
};

export const ContentRestrictionSchema: z.ZodType<ContentRestriction> = apiObject({
  operation: z.enum([
    'administer',
    'copy',
    'create',
    'delete',
    'export',
    'move',
    'purge',
    'purge_version',
    'read',
    'restore',
    'update',
    'use',
  ]),
  restrictions: apiObject({
    user: z.lazy(() => UserArraySchema).optional(),
    group: GroupArraySchema.optional(),
    _expandable: apiObject({
      user: z.string().optional(),
      group: z.string().optional(),
    }).optional(),
  }).optional(),
  content: z.lazy(() => ContentSchema).optional(),
  _expandable: apiObject({
    restrictions: z.string().optional(),
    content: z.string().optional(),
  }),
  _links: GenericLinksSchema,
});
