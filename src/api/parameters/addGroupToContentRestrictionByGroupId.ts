export interface AddGroupToContentRestrictionByGroupId {
  /** The ID of the content that the restriction applies to. */
  id: string;
  /** The operation that the restriction applies to. */
  operationKey: string;
  /** The groupId of the group to add to the content restriction. */
  groupId: string;
}
