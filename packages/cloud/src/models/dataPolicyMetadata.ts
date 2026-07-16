import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
/** Details about data policies. */

export const DataPolicyMetadataSchema = apiObject({
  /** Whether the workspace contains any content blocked for (inaccessible to) the requesting client application. */
  anyContentBlocked: z.boolean().optional(),
});

export type DataPolicyMetadata = z.infer<typeof DataPolicyMetadataSchema>;
