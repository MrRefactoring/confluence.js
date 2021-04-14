import { MigratedUser } from './migratedUser';
import { GenericLinks } from './genericLinks';

export interface MigratedUserArray {
  results: MigratedUser[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
