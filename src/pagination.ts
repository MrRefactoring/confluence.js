/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Pagination<T> {
  results: T[];
  start: number;
  limit: number;
  size: number;
  _links: Record<string, any>;
}
