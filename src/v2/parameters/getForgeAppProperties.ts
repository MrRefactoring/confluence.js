import { z } from 'zod';

export const GetForgeAppPropertiesSchema = z.object({
  /**
   * Used for pagination, this opaque cursor represents the last returned property key. It will be included in the
   * response body as the next link. Use this key to request the next set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of app properties per result to return. If more results exist, use the last returned property key
   * from the Link field in the response body as a cursor to retrieve the next set of results.
   */
  limit: z.number().optional(),
});

export type GetForgeAppProperties = z.input<typeof GetForgeAppPropertiesSchema>;
