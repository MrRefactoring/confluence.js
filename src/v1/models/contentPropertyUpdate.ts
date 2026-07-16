import { z } from 'zod';
import { apiObject } from '#/core';

export const ContentPropertyUpdateSchema = apiObject({
  /** The value of the content property. This can be empty or a complex object. */
  value: z.union([z.array(z.string()), z.boolean(), z.record(z.string(), z.any()), z.string()]),
  /** The version number of the property. */
  version: apiObject({
    /**
     * The new version for the updated content property. Set this to the current version number incremented by one. To
     * get the current version number, use 'Get content property' and retrieve `version.number`.
     */
    number: z.union([z.number(), z.string()]),
    /** If `minorEdit` is set to 'true', no notification email or activity stream will be generated for the change. */
    minorEdit: z.boolean().optional(),
  }).nullable(),
});

export type ContentPropertyUpdate = z.infer<typeof ContentPropertyUpdateSchema>;
