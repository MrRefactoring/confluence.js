import { GenericLinks } from './genericLinks';
import { MigratedUser } from './migratedUser';

export interface MigratedUserArray {
  results: MigratedUser[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
