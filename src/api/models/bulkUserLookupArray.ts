import type { BulkUserLookup } from './bulkUserLookup';
import type { GenericLinks } from './genericLinks';

export interface BulkUserLookupArray {
  results: BulkUserLookup[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
