import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionSchema, type Version } from './version';
import { GenericLinksSchema, type GenericLinks } from './genericLinks';
import { LabelArraySchema, type LabelArray } from './labelArray';
import { LabelSchema, type Label } from './label';

export type ContentMetadata = {
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
  _expandable?: Record<string, unknown>;
};
/** Metadata object for page, blogpost, comment content */

export const ContentMetadataSchema: z.ZodType<ContentMetadata> = apiObject({
  currentuser: apiObject({
    favourited: apiObject({
      isFavourite: z.boolean().optional(),
      favouritedDate: z.coerce.date().optional(),
    }).optional(),
    lastmodified: apiObject({
      version: z.lazy(() => VersionSchema).optional(),
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
  _expandable: z.record(z.string(), z.any()).optional(),
});
