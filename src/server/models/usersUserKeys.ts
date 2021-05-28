import { User } from './user';

export interface UsersUserKeys {
  users: User[];
  userKeys: string[];
  _links?: Record<string, any>;
}
