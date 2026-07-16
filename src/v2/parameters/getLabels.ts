import { z } from 'zod';

export const GetLabelsSchema = z.object({
  /** Filters on label ID. Multiple IDs can be specified as a comma-separated list. */
  labelId: z.array(z.number()).optional(),
  /** Filters on label prefix. Multiple IDs can be specified as a comma-separated list. */
  prefix: z.array(z.string()).optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /** Used to sort the result by a particular field. */
  sort: z.string().optional(),
  /**
   * Maximum number of labels per result to return. If more results exist, use the `Link` header to retrieve a relative
   * URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetLabels = z.input<typeof GetLabelsSchema>;
