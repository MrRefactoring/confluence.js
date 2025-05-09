import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export interface Client {
  sendRequest<T>(requestConfig: RequestConfig, callback?: never): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T>): Promise<void>;
}
