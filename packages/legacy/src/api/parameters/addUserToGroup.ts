import type { AccountId } from '../models/index.js';

export interface AddUserToGroup extends AccountId {
  /** Name of the group whose membership is updated */
  name: string;
}
