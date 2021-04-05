export interface CreateRelationship {
  /** The name of the relationship. This method supports the 'favourite'
    (i.e. 'save for later') relationship. You can also specify any other
    value for this parameter to create a custom relationship type. */
  relationName: string;
  /** The source entity type of the relationship. This must be 'user', if
    the `relationName` is 'favourite'. */
  sourceType: string;
  /** - The identifier for the source entity:

    - If `sourceType` is 'user', then specify either 'current' (logged-in
      user) or the user key.
    - If `sourceType` is 'content', then specify the content ID.
    - If `sourceType` is 'space', then specify the space key. */
  sourceKey: string;
  /** The target entity type of the relationship. This must be 'space' or
    'content', if the `relationName` is 'favourite'. */
  targetType: string;
  /** - The identifier for the target entity:

    - If `sourceType` is 'user', then specify either 'current' (logged-in
      user) or the user key.
    - If `sourceType` is 'content', then specify the content ID.
    - If `sourceType` is 'space', then specify the space key. */
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
}
