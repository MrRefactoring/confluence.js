import type { GenericLinks } from './genericLinks';
import type { User } from './user';

export interface UsersUserKeys {
  users: User[];
  userKeys: string[];
  _links?: GenericLinks;
}
