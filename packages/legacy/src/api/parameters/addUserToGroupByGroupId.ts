import type { AccountId } from '../models/index.js';

export interface AddUserToGroupByGroupId extends AccountId {
  /** GroupId of the group whose membership is updated */
  groupId: string;
}
