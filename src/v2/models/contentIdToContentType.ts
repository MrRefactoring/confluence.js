import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ContentIdToContentTypeSchema = apiObject({
  /**
   * JSON object containing all requested content ids as keys and their associated content types as the values.
   * Duplicate content ids in the request will be returned under a single key in the response. For built-in content
   * types, the enumerations are as specified. Custom content ids will be mapped to their associated type.
   */
  results: z
    .record(z.string(), openEnum(['page', 'blogpost', 'attachment', 'footer-comment', 'inline-comment']))
    .nullish(),
});

export type ContentIdToContentType = z.infer<typeof ContentIdToContentTypeSchema>;
