import { z } from 'zod';
import { apiObject } from '#/core';

export const ContentStateRestInputSchema = apiObject({
  /** Name of content state. Maximum 20 characters. */
  name: z.string().optional(),
  /**
   * Color of state. Must be in 6 digit hex form (#FFFFFF). The default colors offered in the UI are: #ff7452 (red),
   * #2684ff (blue), #ffc400 (yellow), #57d9a3 (green), and #8777d9 (purple)
   */
  color: z.string().optional(),
  /** Id of state. This can be 0,1, or 2 if you wish to specify a default space state. */
  id: z.number().optional(),
});

export type ContentStateRestInput = z.infer<typeof ContentStateRestInputSchema>;
