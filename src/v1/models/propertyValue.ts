import { z } from 'zod';
/**
 * The value of the property. This can be empty or a complex object. 64KB Size Limit* For example,*
 *
 * ```*
 * "value": {*
 *   "example1": "value",*
 *   "example2": true,*
 *   "example3": 123,*
 *   "example4": ["value1", "value2"],*
 * }*
 * ```
 */

export const PropertyValueSchema = z.union([
  z.array(z.string()),
  z.boolean(),
  z.record(z.string(), z.any()),
  z.string(),
]);

export type PropertyValue = z.infer<typeof PropertyValueSchema>;
