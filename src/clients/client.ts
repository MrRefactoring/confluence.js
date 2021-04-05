import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

type Telemetry = any; // TODO

export interface Client {
  sendRequest<T>(requestConfig: RequestConfig, callback?: never, telemetryData?: Partial<Telemetry>): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T>, telemetryData?: Partial<Telemetry>): Promise<void>;
}
