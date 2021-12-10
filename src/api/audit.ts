import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Audit {
  constructor(private client: Client) {}

  /**
   * Returns all records in the audit log, optionally for a certain date range. This contains information about events
   * like space exports, group membership changes, app installations, etc. For more information, see [Audit
   * log](https://confluence.atlassian.com/confcloud/audit-log-802164269.html) in the Confluence administrator's guide.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async getAuditRecords<T = Models.AuditRecordArray>(
    parameters: Parameters.GetAuditRecords | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all records in the audit log, optionally for a certain date range. This contains information about events
   * like space exports, group membership changes, app installations, etc. For more information, see [Audit
   * log](https://confluence.atlassian.com/confcloud/audit-log-802164269.html) in the Confluence administrator's guide.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async getAuditRecords<T = Models.AuditRecordArray>(
    parameters?: Parameters.GetAuditRecords,
    callback?: never
  ): Promise<T>;
  async getAuditRecords<T = Models.AuditRecordArray>(
    parameters?: Parameters.GetAuditRecords,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/audit',
      method: 'GET',
      params: {
        startDate: parameters?.startDate,
        endDate: parameters?.endDate,
        searchString: parameters?.searchString,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a record in the audit log.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async createAuditRecord<T = Models.AuditRecord>(
    parameters: Parameters.CreateAuditRecord | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a record in the audit log.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async createAuditRecord<T = Models.AuditRecord>(
    parameters?: Parameters.CreateAuditRecord,
    callback?: never
  ): Promise<T>;
  async createAuditRecord<T = Models.AuditRecord>(
    parameters?: Parameters.CreateAuditRecord,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/audit',
      method: 'POST',
      data: {
        author: parameters?.author,
        remoteAddress: parameters?.remoteAddress,
        creationDate: parameters?.creationDate,
        summary: parameters?.summary,
        description: parameters?.description,
        category: parameters?.category,
        sysAdmin: parameters?.sysAdmin,
        affectedObject: parameters?.affectedObject,
        changedValues: parameters?.changedValues,
        associatedObjects: parameters?.associatedObjects,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Exports audit records as a CSV file or ZIP file.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async exportAuditRecords<T = unknown>(
    parameters: Parameters.ExportAuditRecords | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Exports audit records as a CSV file or ZIP file.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async exportAuditRecords<T = unknown>(parameters?: Parameters.ExportAuditRecords, callback?: never): Promise<T>;
  async exportAuditRecords<T = unknown>(
    parameters?: Parameters.ExportAuditRecords,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/audit/export',
      method: 'GET',
      params: {
        startDate: parameters?.startDate,
        endDate: parameters?.endDate,
        searchString: parameters?.searchString,
        format: parameters?.format,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the retention period for records in the audit log. The retention period is how long an audit record is kept
   * for, from creation date until it is deleted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async getRetentionPeriod<T = Models.RetentionPeriod>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the retention period for records in the audit log. The retention period is how long an audit record is kept
   * for, from creation date until it is deleted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async getRetentionPeriod<T = Models.RetentionPeriod>(callback?: never): Promise<T>;
  async getRetentionPeriod<T = Models.RetentionPeriod>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/audit/retention',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the retention period for records in the audit log. The retention period can be set to a maximum of 20 years.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async setRetentionPeriod<T = Models.RetentionPeriod>(
    parameters: Parameters.SetRetentionPeriod | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets the retention period for records in the audit log. The retention period can be set to a maximum of 20 years.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async setRetentionPeriod<T = Models.RetentionPeriod>(
    parameters?: Parameters.SetRetentionPeriod,
    callback?: never
  ): Promise<T>;
  async setRetentionPeriod<T = Models.RetentionPeriod>(
    parameters?: Parameters.SetRetentionPeriod,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/audit/retention',
      method: 'PUT',
      data: {
        number: parameters?.number,
        units: parameters?.units,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns records from the audit log, for a time period back from the current date. For example, you can use this
   * method to get the last 3 months of records.
   *
   * This contains information about events like space exports, group membership changes, app installations, etc. For
   * more information, see [Audit log](https://confluence.atlassian.com/confcloud/audit-log-802164269.html) in the
   * Confluence administrator's guide.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async getAuditRecordsForTimePeriod<T = Models.AuditRecordArray>(
    parameters: Parameters.GetAuditRecordsForTimePeriod | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns records from the audit log, for a time period back from the current date. For example, you can use this
   * method to get the last 3 months of records.
   *
   * This contains information about events like space exports, group membership changes, app installations, etc. For
   * more information, see [Audit log](https://confluence.atlassian.com/confcloud/audit-log-802164269.html) in the
   * Confluence administrator's guide.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
   */
  async getAuditRecordsForTimePeriod<T = Models.AuditRecordArray>(
    parameters?: Parameters.GetAuditRecordsForTimePeriod,
    callback?: never
  ): Promise<T>;
  async getAuditRecordsForTimePeriod<T = Models.AuditRecordArray>(
    parameters?: Parameters.GetAuditRecordsForTimePeriod,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/audit/since',
      method: 'GET',
      params: {
        number: parameters?.number,
        units: parameters?.units,
        searchString: parameters?.searchString,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
