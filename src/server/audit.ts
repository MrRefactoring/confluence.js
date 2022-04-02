import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { Pagination } from '../pagination';
import { RequestConfig } from '../requestConfig';

export class Audit {
  constructor(private client: Client) {}

  /** Fetch a paginated list of AuditRecord instances dating back to a certain time */
  async getAuditRecords<T = Pagination<Models.AuditRecord>>(
    parameters: Parameters.GetAuditRecords | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Fetch a paginated list of AuditRecord instances dating back to a certain time */
  async getAuditRecords<T = Pagination<Models.AuditRecord>>(
    parameters?: Parameters.GetAuditRecords,
    callback?: never
  ): Promise<T>;
  async getAuditRecords<T = Pagination<Models.AuditRecord>>(
    parameters?: Parameters.GetAuditRecords,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/audit',
      method: 'GET',
      params: {
        startDate: parameters?.startDate,
        endDate: parameters?.endDate,
        start: parameters?.start,
        limit: parameters?.limit,
        searchString: parameters?.searchString,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getAuditRecords' });
  }

  /** Creates a record in the audit log. */
  async createAuditRecord<T = Models.AuditRecord>(
    parameters: Parameters.CreateAuditRecord,
    callback: Callback<T>
  ): Promise<void>;
  /** Creates a record in the audit log. */
  async createAuditRecord<T = Models.AuditRecord>(
    parameters: Parameters.CreateAuditRecord,
    callback?: never
  ): Promise<T>;
  async createAuditRecord<T = Models.AuditRecord>(
    parameters: Parameters.CreateAuditRecord,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/audit',
      method: 'POST',
      data: {
        author: parameters.author,
        remoteAddress: parameters.remoteAddress,
        creationDate: parameters.creationDate,
        summary: parameters.summary,
        description: parameters.description,
        category: parameters.category,
        sysAdmin: parameters.sysAdmin,
        affectedObject: parameters.affectedObject,
        changedValues: parameters.changedValues,
        associatedObjects: parameters.associatedObjects,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.createAuditRecord' });
  }

  /** Exports audit records as a CSV file or ZIP file. */
  async exportAuditRecords<T = ArrayBuffer>(
    parameters: Parameters.ExportAuditRecords | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Exports audit records as a CSV file or ZIP file. */
  async exportAuditRecords<T = ArrayBuffer>(parameters?: Parameters.ExportAuditRecords, callback?: never): Promise<T>;
  async exportAuditRecords<T = ArrayBuffer>(
    parameters?: Parameters.ExportAuditRecords,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/audit/export',
      method: 'GET',
      params: {
        startDate: parameters?.startDate,
        endDate: parameters?.endDate,
        searchString: parameters?.searchString,
        format: parameters?.format,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.exportAuditRecords' });
  }

  /** Fetches the current retention periodResponses */
  async getRetentionPeriod<T = Models.RetentionPeriod>(callback: Callback<T>): Promise<void>;
  /** Fetches the current retention periodResponses */
  async getRetentionPeriod<T = Models.RetentionPeriod>(callback?: never): Promise<T>;
  async getRetentionPeriod<T = Models.RetentionPeriod>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/audit/retention',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getRetentionPeriod' });
  }

  /** Set the retention period to a new value. Can throw ServiceException if the retention period is too long */
  async setRetentionPeriod<T = Models.RetentionPeriod>(
    parameters: Models.RetentionPeriod,
    callback: Callback<T>
  ): Promise<void>;
  /** Set the retention period to a new value. Can throw ServiceException if the retention period is too long */
  async setRetentionPeriod<T = Models.RetentionPeriod>(
    parameters: Models.RetentionPeriod,
    callback?: never
  ): Promise<T>;
  async setRetentionPeriod<T = Models.RetentionPeriod>(
    parameters: Models.RetentionPeriod,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/audit/retention',
      method: 'PUT',
      data: {
        number: parameters.number,
        units: parameters.units,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.setRetentionPeriod' });
  }

  /** Fetch a paginated list of AuditRecord instances dating back to a certain time */
  async getAuditRecordsForTimePeriod<T = Pagination<Models.AuditRecord>>(
    parameters: Parameters.GetAuditRecordsSince | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /** Fetch a paginated list of AuditRecord instances dating back to a certain time */
  async getAuditRecordsForTimePeriod<T = Pagination<Models.AuditRecord>>(
    parameters?: Parameters.GetAuditRecordsSince,
    callback?: never
  ): Promise<T>;
  async getAuditRecordsForTimePeriod<T = Pagination<Models.AuditRecord>>(
    parameters?: Parameters.GetAuditRecordsSince,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/audit/since',
      method: 'GET',
      params: {
        number: parameters?.number,
        units: parameters?.units,
        start: parameters?.start,
        limit: parameters?.limit,
        searchString: parameters?.searchString,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'server.getAuditRecordsForTimePeriod' });
  }
}
