import type { AffectedObject } from './affectedObject';
import type { ChangedValue } from './changedValue';

export interface AuditRecord {
  author: {
    type: string;
    displayName: string;
    operations: {};
  };
  remoteAddress: string;
  /** The creation date-time of the audit record, as a timestamp. */
  creationDate: number;
  summary: string;
  description: string;
  category: string;
  sysAdmin: boolean;
  affectedObject: AffectedObject;
  changedValues: ChangedValue[];
  associatedObjects: AffectedObject[];
}
