import type { Content } from './content.js';
import type { GenericLinks } from './genericLinks.js';
import type { User } from './user.js';
import type { UsersUserKeys } from './usersUserKeys.js';

export interface Version {
  by: User;
  when: string;
  friendlyWhen: string;
  message: string;
  number: number;
  minorEdit: boolean;
  content?: Content;
  collaborators?: UsersUserKeys;
  _expandable: {
    content: string;
    collaborators: string;
  };
  _links: GenericLinks;
}
