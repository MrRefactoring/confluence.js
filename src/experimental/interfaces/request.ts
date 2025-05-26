export interface Request<T> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | number[] | string[]>;
  body?: T
}
