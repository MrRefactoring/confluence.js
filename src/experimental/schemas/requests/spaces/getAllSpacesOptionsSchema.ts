import { z } from 'zod';

export const GetAllSpacesOptionsSchema = z.strictObject({
  /** Filter the results to spaces based on their IDs. Multiple IDs can be specified as a comma-separated list. */
  ids: z.array(z.number().int()).max(250),
  /** Filter the results to spaces based on their keys. Multiple keys can be specified as a comma-separated list. */
  keys: z.array(z.string()).max(250),
  /** Filter the results to spaces based on their type. */
  type: z.enum(['global', 'collaboration', 'knowledge_base', 'personal']),
  /** Filter the results to spaces based on their status. */
  status: z.enum(['current', 'archived']),
  /** Filter the results to spaces based on their labels. Multiple labels can be specified as a comma-separated list. */
  labels: z.array(z.string()),
  /** Filter the results to spaces favorited by the user with the specified account ID. */
  favoritedBy: z.string(),
  /** Filter the results to spaces NOT favorited by the user with the specified account ID. */
  notFavoritedBy: z.string(),
  /** Used to sort the result by a particular field. */
  sort: z.enum(['id', '-id', 'key', '-key', 'name', '-name']),
  /**
   * The content format type to be returned in the `description` field of the response. If available, the representation
   * will be available under a response field of the same name under the `description` field.
   */
  descriptionFormat: z.enum(['plain', 'view']),
  /**
   * If the icon for the space should be fetched or not.
   *
   * @default false
   */
  includeIcon: z.boolean(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string(),
  /**
   * Maximum number of spaces per result to return. If more results exist, use the `Link` response header to retrieve a
   * relative URL that will return the next set of results.
   *
   * @default 25
   */
  limit: z.number().int().min(1).max(250).default(25),
}).partial();

export type GetAllSpacesOptions = z.infer<typeof GetAllSpacesOptionsSchema>;
