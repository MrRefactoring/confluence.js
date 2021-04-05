import { User } from './user';
import { GenericLinks } from './genericLinks';

export interface UsersUserKeys {
  users: User[];
  userKeys: string[];
  _links?: GenericLinks;
}
