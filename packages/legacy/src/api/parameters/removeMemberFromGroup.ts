export interface RemoveMemberFromGroup {
  /** Name of the group whose membership is updated. */
  name: string;
  /** AccountId of the user whose membership is removed. */
  accountId: string;
}
