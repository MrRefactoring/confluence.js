import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';

export const UserPropertySchema = apiObject({
  key: z.string(),
  /** The value of the content property. */
  value: z.record(z.string(), z.any()),
  /** A unique identifier for the user property */
  id: z.string(),
  /** Datetime when the property was last modified such as `2022-02-01T12:00:00.111Z` */
  lastModifiedDate: z.coerce.date(),
  /** Datetime when the property was created such as `2022-01-01T12:00:00.111Z` */
  createdDate: z.coerce.date(),
  _links: GenericLinksSchema.optional(),
});

export type UserProperty = z.infer<typeof UserPropertySchema>;
