import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Audit {
  constructor(private client: Client) {}

  /** Fetch a paginated list of AuditRecord instances dating back to a certain time */
  async getAuditRecords<T = unknown>(
    parameters: Parameters.GetAuditRecords | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Fetch a paginated list of AuditRecord instances dating back to a certain time */
  async getAuditRecords<T = unknown>(parameters?: Parameters.GetAuditRecords, callback?: never): Promise<T>;
  async getAuditRecords<T = unknown>(
    parameters?: Parameters.GetAuditRecords,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/audit',
      method: 'GET',
      params: {
        startDate: parameters?.startDate,
        endDate: parameters?.endDate,
        start: parameters?.start,
        limit: parameters?.limit,
        searchString: parameters?.searchString,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getAuditRecords' });
  }

  async storeRecord<T = unknown>(callback: Callback<T>): Promise<void>;
  async storeRecord<T = unknown>(callback?: never): Promise<T>;
  async storeRecord<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/audit',
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'storeRecord' });
  }

  async export<T = unknown>(parameters: Parameters.Export | undefined, callback: Callback<T>): Promise<void>;
  async export<T = unknown>(parameters?: Parameters.Export, callback?: never): Promise<T>;
  async export<T = unknown>(parameters?: Parameters.Export, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/audit/export',
      method: 'GET',
      params: {
        startDate: parameters?.startDate,
        endDate: parameters?.endDate,
        searchString: parameters?.searchString,
        format: parameters?.format,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'export' });
  }

  /** Fetches the current retention periodResponses */
  async getRetentionPeriod<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Fetches the current retention periodResponses */
  async getRetentionPeriod<T = unknown>(callback?: never): Promise<T>;
  async getRetentionPeriod<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/audit/retention',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'getRetentionPeriod' });
  }

  /** Set the retention period to a new value. Can throw ServiceException if the retention period is too long */
  async setRetentionPeriod<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Set the retention period to a new value. Can throw ServiceException if the retention period is too long */
  async setRetentionPeriod<T = unknown>(callback?: never): Promise<T>;
  async setRetentionPeriod<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/audit/retention',
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'setRetentionPeriod' });
  }

  /** Fetch a paginated list of AuditRecord instances dating back to a certain time */
  async getAuditRecordsSince<T = unknown>(
    parameters: Parameters.GetAuditRecordsSince | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Fetch a paginated list of AuditRecord instances dating back to a certain time */
  async getAuditRecordsSince<T = unknown>(parameters?: Parameters.GetAuditRecordsSince, callback?: never): Promise<T>;
  async getAuditRecordsSince<T = unknown>(
    parameters?: Parameters.GetAuditRecordsSince,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/audit/since',
      method: 'GET',
      params: {
        number: parameters?.number,
        units: parameters?.units,
        start: parameters?.start,
        limit: parameters?.limit,
        searchString: parameters?.searchString,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getAuditRecordsSince' });
  }
}
