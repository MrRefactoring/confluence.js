import { User } from './user';
import { UsersUserKeys } from './usersUserKeys';
import { Version } from './version';

export interface ContentHistory {
  latest: boolean;
  createdBy: User;
  createdDate: string;
  lastUpdated?: Version;
  previousVersion?: Version;
  contributors?: {
    publishers?: UsersUserKeys;
  };
  nextVersion?: Version;
  _expandable?: {
    lastUpdated?: string;
    previousVersion?: string;
    contributors?: string;
    nextVersion?: string;
  };
  _links?: Record<string, any>;
}
