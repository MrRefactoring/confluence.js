export interface GetRelationship {
  /** The name of the relationship. This method supports the 'favourite'
   (i.e. 'save for later') relationship as well as any other relationship
   types created via [Create relationship](#api-relation-relationName-from-sourceType-sourceKey-to-targetType-targetKey-put). */
  relationName: string;
  /** The source entity type of the relationship. This must be 'user', if
   the `relationName` is 'favourite'. */
  sourceType: string;
  /** - The identifier for the source entity:

   - If `sourceType` is `user`, then specify either `current` (logged-in user), the user key of the user, or
   the account ID of the user. Note that the user key has been deprecated in favor of the account ID for this parameter. See the
   [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
   for details.
   - If `sourceType` is 'content', then specify the content ID.
   - If `sourceType` is 'space', then specify the space key. */
  sourceKey: string;
  /** The target entity type of the relationship. This must be 'space' or
   'content', if the `relationName` is 'favourite'. */
  targetType: string;
  /** The identifier for the target entity:

   - If `targetType` is `user`, then specify either `current` (logged-in user), the user key of the user, or
   the account ID of the user. Note that the user key has been deprecated in favor of the account ID for this parameter. See the
   [migration guide](https://developer.atlassian.com/cloud/confluence/deprecation-notice-user-privacy-api-migration-guide/)
   for details.
   - If `targetType` is 'content', then specify the content ID.
   - If `targetType` is 'space', then specify the space key. */
  targetKey: string;
  /** The status of the source. This parameter is only used when the
   `sourceType` is 'content'. */
  sourceStatus?: string;
  /** The status of the target. This parameter is only used when the
   `targetType` is 'content'. */
  targetStatus?: string;
  /** The version of the source. This parameter is only used when the
   `sourceType` is 'content' and the `sourceStatus` is 'historical'. */
  sourceVersion?: number;
  /** The version of the target. This parameter is only used when the
   `targetType` is 'content' and the `targetStatus` is 'historical'. */
  targetVersion?: number;
  /** A multi-value parameter indicating which properties of the response
   object to expand.

   - `relationData` returns information about the relationship, such as
   who created it and when it was created.
   - `source` returns the source entity.
   - `target` returns the target entity. */
  expand?: string[];
}
