import { z } from 'zod';
import { SpaceSortOrderSchema } from '../models/index.js';
import { SpaceDescriptionBodyRepresentationSchema } from '../models/index.js';

export const GetSpacesSchema = z.object({
  /** Filter the results to spaces based on their IDs. Multiple IDs can be specified as a comma-separated list. */
  ids: z.array(z.number()).optional(),
  /** Filter the results to spaces based on their keys. Multiple keys can be specified as a comma-separated list. */
  keys: z.array(z.string()).optional(),
  /** Filter the results to spaces based on their type. */
  type: z
    .enum(['global', 'collaboration', 'knowledge_base', 'personal', 'system', 'onboarding', 'xflow_sample_space'])
    .optional(),
  /** Filter the results to spaces based on their status. */
  status: z.enum(['current', 'archived']).optional(),
  /** Filter the results to spaces based on their labels. Multiple labels can be specified as a comma-separated list. */
  labels: z.array(z.string()).optional(),
  /** Filter the results to spaces favorited by the user with the specified account ID. */
  favoritedBy: z.string().optional(),
  /** Filter the results to spaces NOT favorited by the user with the specified account ID. */
  notFavoritedBy: z.string().optional(),
  /** Used to sort the result by a particular field. */
  sort: SpaceSortOrderSchema.optional(),
  /**
   * The content format type to be returned in the `description` field of the response. If available, the
   * representation will be available under a response field of the same name under the `description` field.
   */
  descriptionFormat: SpaceDescriptionBodyRepresentationSchema.optional(),
  /** If the icon for the space should be fetched or not. */
  includeIcon: z.boolean().optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of spaces per result to return. If more results exist, use the `Link` response header to retrieve
   * a relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetSpaces = z.input<typeof GetSpacesSchema>;
