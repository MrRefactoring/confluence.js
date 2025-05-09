import type { AuditRecord } from './auditRecord';
import type { GenericLinks } from './genericLinks';

export interface AuditRecordArray {
  results: AuditRecord[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
