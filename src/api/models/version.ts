import type { Content } from './content';
import type { GenericLinks } from './genericLinks';
import type { User } from './user';
import type { UsersUserKeys } from './usersUserKeys';

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
