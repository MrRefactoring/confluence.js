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
  // TODO
  // affectedObject: AffectedObject;
  // changedValues: ChangedValue[];
  // associatedObjects: AffectedObject[];
}
