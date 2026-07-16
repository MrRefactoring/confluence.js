import type { GenericLinks } from './genericLinks.js';
import type { MigratedUser } from './migratedUser.js';

export interface MigratedUserArray {
  results: MigratedUser[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
