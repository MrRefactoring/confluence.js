import { GenericLinks } from './genericLinks';
import { SearchResult } from './searchResult';

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
