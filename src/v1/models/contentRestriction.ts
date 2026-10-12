import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { UserArraySchema, type UserArray, type UserArrayInput } from './userArray';
import { GroupArraySchema, type GroupArray } from './groupArray';
import { ContentSchema, type Content, type ContentInput } from './content';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';

export interface ContentRestriction {
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
    | 'use'
    | (string & {});
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
  [key: string]: unknown;
}

export type ContentRestrictionInput = unknown;

export const ContentRestrictionSchema: z.ZodType<ContentRestriction, ContentRestrictionInput> = apiObject({
  operation: openEnum([
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
    user: (
      z.lazy((): z.ZodType<UserArray, UserArrayInput> => UserArraySchema) as z.ZodType<UserArray, UserArrayInput>
    ).optional(),
    group: GroupArraySchema.optional(),
    _expandable: apiObject({
      user: z.string().optional(),
      group: z.string().optional(),
    }).optional(),
  }).optional(),
  content: (
    z.lazy((): z.ZodType<Content, ContentInput> => ContentSchema) as z.ZodType<Content, ContentInput>
  ).optional(),
  _expandable: apiObject({
    restrictions: z.string().optional(),
    content: z.string().optional(),
  }),
  _links: GenericLinksSchema,
});
