import { User } from './user';
import { Content } from './content';
import { UsersUserKeys } from './usersUserKeys';

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
  _links: Record<string, any>;
}
