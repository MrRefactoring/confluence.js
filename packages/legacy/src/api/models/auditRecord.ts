import type { AffectedObject } from './affectedObject.js';
import type { ChangedValue } from './changedValue.js';

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
