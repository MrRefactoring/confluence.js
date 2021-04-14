import { AuditRecord } from './auditRecord';
import { GenericLinks } from './genericLinks';

export interface AuditRecordArray {
  results: AuditRecord[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
