export interface GetContentRestrictionStatusForGroup {
  /** The ID of the content that the restriction applies to. */
  id: string;
  /** The operation that the restriction applies to. */
  operationKey: string;
  /** The name of the group to be queried for whether the content restriction applies to it. */
  groupName: string;
}
