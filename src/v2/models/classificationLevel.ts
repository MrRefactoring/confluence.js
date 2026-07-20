import { z } from 'zod';
import { apiObject } from '#/core';
import { ClassificationLevelStatusSchema } from './classificationLevelStatus';
import { ClassificationLevelColorSchema } from './classificationLevelColor';
/**
 * A unit of [data
 * classification](https://support.atlassian.com/security-and-access-policies/docs/what-is-data-classification/) defined
 * by an organiation. * A classification level may be associated with specific storage and handling requirements or
 * expectations.
 */

export const ClassificationLevelSchema = apiObject({
  /** The ID of the classification level. */
  id: z.string().optional(),
  /** The status of the classification level. */
  status: ClassificationLevelStatusSchema.optional(),
  /** The order of the classification level object. */
  order: z.number().optional(),
  /** The name of the classification level object. */
  name: z.string().optional(),
  /** The description of the classification level object. */
  description: z.string().optional(),
  /** The guideline of the classification level object. */
  guideline: z.string().optional(),
  /** The color of the classification level object. */
  color: ClassificationLevelColorSchema.optional(),
});

export type ClassificationLevel = z.infer<typeof ClassificationLevelSchema>;
