export interface AddGroupToContentRestriction {
  /** The ID of the content that the restriction applies to. */
  id: string;
  /** The operation that the restriction applies to. */
  operationKey: string;
  /** The name of the group to add to the content restriction. */
  groupName: string;
}
