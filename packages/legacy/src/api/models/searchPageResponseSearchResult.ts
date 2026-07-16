import type { GenericLinks } from './genericLinks.js';
import type { SearchResult } from './searchResult.js';

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
