import { Links } from './links';

export interface Pagination<T> {
  results: T[];
  _links: Links;
}
