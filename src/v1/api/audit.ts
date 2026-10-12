import { AuditRecordArraySchema, type AuditRecordArray } from '../models/auditRecordArray';
import { AuditRecordSchema, type AuditRecord } from '../models/auditRecord';
import { RetentionPeriodSchema, type RetentionPeriod } from '../models/retentionPeriod';
import type { GetAuditRecords } from '../parameters/getAuditRecords';
import type { CreateAuditRecord } from '../parameters/createAuditRecord';
import type { ExportAuditRecords } from '../parameters/exportAuditRecords';
import type { SetRetentionPeriod } from '../parameters/setRetentionPeriod';
import type { GetAuditRecordsForTimePeriod } from '../parameters/getAuditRecordsForTimePeriod';
import { type Client, type RequestOptions, type SendRequestOptions, BufferSchema, type Buffer } from '#/core';

/**
 * Returns all records in the audit log, optionally for a certain date range. This contains information about events
 * like space exports, group membership changes, app installations, etc. For more information, see [Audit
 * log](https://confluence.atlassian.com/confcloud/audit-log-802164269.html) in the Confluence administrator's guide.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
 */
export async function getAuditRecords(
  client: Client,
  parameters?: GetAuditRecords,
  options?: RequestOptions,
): Promise<AuditRecordArray> {
  const config: SendRequestOptions<AuditRecordArray> = {
    url: '/wiki/rest/api/audit',
    method: 'GET',
    searchParams: {
      startDate: parameters?.startDate,
      endDate: parameters?.endDate,
      searchString: parameters?.searchString,
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: AuditRecordArraySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a record in the audit log.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
 */
export async function createAuditRecord(
  client: Client,
  parameters: CreateAuditRecord,
  options?: RequestOptions,
): Promise<AuditRecord> {
  const config: SendRequestOptions<AuditRecord> = {
    url: '/wiki/rest/api/audit',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
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
    schema: AuditRecordSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Exports audit records as a CSV file or ZIP file.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
 */
export async function exportAuditRecords(
  client: Client,
  parameters?: ExportAuditRecords,
  options?: RequestOptions,
): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: '/wiki/rest/api/audit/export',
    method: 'GET',
    searchParams: {
      startDate: parameters?.startDate,
      endDate: parameters?.endDate,
      searchString: parameters?.searchString,
      format: parameters?.format,
    },
    schema: BufferSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the retention period for records in the audit log. The retention period is how long an audit record is kept
 * for, from creation date until it is deleted.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
 */
export async function getRetentionPeriod(client: Client, options?: RequestOptions): Promise<RetentionPeriod> {
  const config: SendRequestOptions<RetentionPeriod> = {
    url: '/wiki/rest/api/audit/retention',
    method: 'GET',
    schema: RetentionPeriodSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the retention period for records in the audit log. The retention period can be set to a maximum of 1 year.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
 */
export async function setRetentionPeriod(
  client: Client,
  parameters: SetRetentionPeriod,
  options?: RequestOptions,
): Promise<RetentionPeriod> {
  const config: SendRequestOptions<RetentionPeriod> = {
    url: '/wiki/rest/api/audit/retention',
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: {
      number: parameters.number,
      units: parameters.units,
    },
    schema: RetentionPeriodSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns records from the audit log, for a time period back from the current date. For example, you can use this
 * method to get the last 3 months of records.
 *
 * This contains information about events like space exports, group membership changes, app installations, etc. For more
 * information, see [Audit log](https://confluence.atlassian.com/confcloud/audit-log-802164269.html) in the Confluence
 * administrator's guide.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Confluence Administrator' global permission.
 */
export async function getAuditRecordsForTimePeriod(
  client: Client,
  parameters?: GetAuditRecordsForTimePeriod,
  options?: RequestOptions,
): Promise<AuditRecordArray> {
  const config: SendRequestOptions<AuditRecordArray> = {
    url: '/wiki/rest/api/audit/since',
    method: 'GET',
    searchParams: {
      number: parameters?.number,
      units: parameters?.units,
      searchString: parameters?.searchString,
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: AuditRecordArraySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
