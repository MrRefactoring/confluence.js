import type { GenericLinks } from './genericLinks';
import type { MigratedUser } from './migratedUser';

export interface MigratedUserArray {
  results: MigratedUser[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
