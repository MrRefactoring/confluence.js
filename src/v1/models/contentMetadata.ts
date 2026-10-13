import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema, type Version, type VersionInput } from './version';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';
import { LabelArraySchema, type LabelArray } from './labelArray';
import { LabelSchema, type Label } from './label';

export interface ContentMetadata {
  currentuser?: {
    favourited?: {
      isFavourite?: boolean;
      favouritedDate?: Date;
    };
    lastmodified?: {
      version?: Version;
      friendlyLastModified?: string;
    };
    lastcontributed?: {
      status?: string;
      when?: Date;
    };
    viewed?: {
      lastSeen?: Date;
      friendlyLastSeen?: string;
    };
    scheduled?: Record<string, unknown>;
    _expandable?: {
      favourited?: string;
      lastmodified?: string;
      lastcontributed?: string;
      viewed?: string;
      scheduled?: string;
    };
  };
  properties?: GenericLinks;
  frontend?: Record<string, unknown>;
  labels?: LabelArray | Label[];
  mediaType?: string;
  comment?: string;
  _expandable?: Record<string, unknown>;
  [key: string]: unknown;
}

export type ContentMetadataInput = unknown;

/** Metadata object for page, blogpost, comment content */
export const ContentMetadataSchema: z.ZodType<ContentMetadata, ContentMetadataInput> = apiObject({
  currentuser: apiObject({
    favourited: apiObject({
      isFavourite: z.boolean().optional(),
      favouritedDate: z.coerce.date().optional(),
    }).optional(),
    lastmodified: apiObject({
      version: (
        z.lazy((): z.ZodType<Version, VersionInput> => VersionSchema) as z.ZodType<Version, VersionInput>
      ).optional(),
      friendlyLastModified: z.string().optional(),
    }).optional(),
    lastcontributed: apiObject({
      status: z.string().optional(),
      when: z.coerce.date().optional(),
    }).optional(),
    viewed: apiObject({
      lastSeen: z.coerce.date().optional(),
      friendlyLastSeen: z.string().optional(),
    }).optional(),
    scheduled: z.record(z.string(), z.any()).optional(),
    _expandable: apiObject({
      favourited: z.string().optional(),
      lastmodified: z.string().optional(),
      lastcontributed: z.string().optional(),
      viewed: z.string().optional(),
      scheduled: z.string().optional(),
    }).optional(),
  }).optional(),
  properties: GenericLinksSchema.optional(),
  frontend: z.record(z.string(), z.any()).optional(),
  labels: z.union([LabelArraySchema, z.array(LabelSchema)]).optional(),
  mediaType: z.string().optional(),
  comment: z.string().optional(),
  _expandable: z.record(z.string(), z.any()).optional(),
});
