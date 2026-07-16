import type { Callback } from '../callback.js';
import type { RequestConfig } from '../requestConfig.js';

export interface Client {
  sendRequest<T>(requestConfig: RequestConfig, callback?: never): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T>): Promise<void>;
}
