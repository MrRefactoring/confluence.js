import { SearchResult } from './searchResult';
import { GenericLinks } from './genericLinks';

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
