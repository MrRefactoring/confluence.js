import type { GenericLinks } from './genericLinks';
import type { SearchResult } from './searchResult';

export interface SearchPageResponseSearchResult {
  results: SearchResult[];
  start: number;
  limit: number;
  size: number;
  totalSize: number;
  cqlQuery: string;
  searchDuration: number;
  _links: GenericLinks;
}
