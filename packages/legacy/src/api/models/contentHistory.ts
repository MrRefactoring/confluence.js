import type { GenericLinks } from './genericLinks.js';
import type { User } from './user.js';
import type { UsersUserKeys } from './usersUserKeys.js';
import type { Version } from './version.js';

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
