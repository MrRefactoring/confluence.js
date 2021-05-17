export interface RemoveGroupByName {
  /** The ID of the content that the restriction applies to. */
  id: string;
  /**
   * The operation that the restriction applies to.
   *
   * @example
   *   "read";
   *   "update";
   */
  operationKey: string;
  /** The name of the group to remove from the content restriction. */
  groupName: string;
}
