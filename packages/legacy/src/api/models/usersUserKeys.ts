import type { GenericLinks } from './genericLinks.js';
import type { User } from './user.js';

export interface UsersUserKeys {
  users: User[];
  userKeys: string[];
  _links?: GenericLinks;
}
