import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';

export const ContentPropertySchema = apiObject({
  id: z.string(),
  key: z.string(),
  /** The value of the content property. This can be empty or a complex object. */
  value: z.union([z.array(z.string()), z.boolean(), z.record(z.string(), z.any()), z.string()]),
  version: apiObject({
    when: z.coerce.date(),
    message: z.string(),
    number: z.number(),
    minorEdit: z.boolean(),
    /** True if content type is modifed in this version (e.g. page to blog) */
    contentTypeModified: z.boolean().optional(),
  }).optional(),
  _links: GenericLinksSchema,
  _expandable: apiObject({
    content: z.string().optional(),
    additionalProperties: z.string().optional(),
  }).optional(),
});

export type ContentProperty = z.infer<typeof ContentPropertySchema>;
