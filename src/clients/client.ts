import type { Callback } from '../callback';
import type { Config } from '../config';
import type { RequestConfig } from '../requestConfig';

export interface Client {
  getResponseHandler<T>(callback?: Callback<T>): (data: T) => void;

  getErrorHandler(callback?: Callback<never>): (error: Config.Error) => void;

  sendRequest<T>(requestConfig: RequestConfig, callback?: never, telemetryData?: any): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T>, telemetryData?: any): Promise<void>;
}
