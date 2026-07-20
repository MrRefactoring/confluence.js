import { z } from 'zod';

export const RemoveLabelFromContentUsingQueryParameterSchema = z.object({
  /** The ID of the content that the label will be removed from. */
  id: z.string(),
  /** The name of the label to be removed. */
  name: z.string(),
});

export type RemoveLabelFromContentUsingQueryParameter = z.input<typeof RemoveLabelFromContentUsingQueryParameterSchema>;
