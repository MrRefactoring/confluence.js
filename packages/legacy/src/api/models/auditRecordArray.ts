import type { AuditRecord } from './auditRecord.js';
import type { GenericLinks } from './genericLinks.js';

export interface AuditRecordArray {
  results: AuditRecord[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
