import { AffectedObject } from './affectedObject';
import { ChangedValue } from './changedValue';

export interface AuditRecord {
  author: {
    type: string;
    displayName: string;
    operations: {};
    username: string;
    userKey: string;
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
