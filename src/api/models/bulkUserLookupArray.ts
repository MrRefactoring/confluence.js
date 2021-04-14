import { BulkUserLookup } from './bulkUserLookup';
import { GenericLinks } from './genericLinks';

export interface BulkUserLookupArray {
  results: BulkUserLookup[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
