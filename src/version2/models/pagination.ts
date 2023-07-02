import { Links } from './links';

export interface Pagination<T> {
  results: T[];
  parameters: Record<string, string>;
  hasNext: boolean;
  next: () => Promise<Pagination<T>>;
  getAll: () => Promise<T[]>;
  _links: Links;
}
