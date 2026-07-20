import { z } from 'zod';
import { apiObject } from '#/core';

export const DynamicModulesErrorMessageSchema = apiObject({
  /** The error message. */
  message: z.string(),
});

export type DynamicModulesErrorMessage = z.infer<typeof DynamicModulesErrorMessageSchema>;
