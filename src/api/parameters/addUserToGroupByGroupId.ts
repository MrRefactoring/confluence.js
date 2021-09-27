import { AccountId } from '../models';

export interface AddUserToGroupByGroupId extends AccountId {
  /** GroupId of the group whose membership is updated */
  groupId: string;
}
