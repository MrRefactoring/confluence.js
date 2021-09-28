import { AccountId } from '../models';

export interface AddUserToGroup extends AccountId {
  /** Name of the group whose membership is updated */
  name: string;
}
