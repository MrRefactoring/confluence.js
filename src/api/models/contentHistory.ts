import type { GenericLinks } from './genericLinks';
import type { User } from './user';
import type { UsersUserKeys } from './usersUserKeys';
import type { Version } from './version';

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
  _links?: GenericLinks;
}
