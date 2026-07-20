import { z } from 'zod';

export const FindSourcesForTargetSchema = z.object({
  /**
   * The name of the relationship. This method supports relationships created via [Create
   * relationship](#api-wiki-rest-api-relation-relationname-from-sourcetype-sourcekey-to-targettype-targetkey-put).
   * Note, this method does not support 'like' or 'favourite' relationships.
   */
  relationName: z.string(),
  /** The source entity type of the relationship. */
  sourceType: z.enum(['user', 'content', 'space']),
  /** The target entity type of the relationship. */
  targetType: z.enum(['user', 'content', 'space']),
  /**
   * The identifier for the target entity:
   *
   * - If `targetType` is `user`, then specify either `current` (logged-in user), the user key of the user, or the
   *   account ID of the user. Note that the user key has been deprecated in favor of the account ID for this
   *   parameter. See the [migration
   *   guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
   *   for details.
   * - If `targetType` is 'content', then specify the content ID.
   * - If `targetType` is 'space', then specify the space key.
   */
  targetKey: z.string(),
  /** The status of the source. This parameter is only used when the `sourceType` is 'content'. */
  sourceStatus: z.string().optional(),
  /** The status of the target. This parameter is only used when the `targetType` is 'content'. */
  targetStatus: z.string().optional(),
  /**
   * The version of the source. This parameter is only used when the `sourceType` is 'content' and the `sourceStatus`
   * is 'historical'.
   */
  sourceVersion: z.number().optional(),
  /**
   * The version of the target. This parameter is only used when the `targetType` is 'content' and the `targetStatus`
   * is 'historical'.
   */
  targetVersion: z.number().optional(),
  /**
   * A multi-value parameter indicating which properties of the response object to expand.
   *
   * - `relationData` returns information about the relationship, such as who created it and when it was created.
   * - `source` returns the source entity.
   * - `target` returns the target entity.
   */
  expand: z.array(z.enum(['relationData', 'source', 'target'])).optional(),
  /** The starting index of the returned relationships. */
  start: z.number().optional(),
  /** The maximum number of relationships to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type FindSourcesForTarget = z.input<typeof FindSourcesForTargetSchema>;
