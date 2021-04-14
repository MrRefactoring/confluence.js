export interface RemoveMemberFromGroupByGroupId {
  /** Id of the group whose membership is updated. */
  groupId: string;
  /** AccountId of the user whose membership is removed. */
  accountId: string;
}
