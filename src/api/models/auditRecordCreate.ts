import type { AffectedObject } from './affectedObject';
import type { ChangedValue } from './changedValue';

export interface AuditRecordCreate {
  /**
   * The user that actioned the event. If `author` is not specified, then all `author` properties will be set to
   * null/empty, except for `type` which will be set to 'user'.
   */
  author?: {
    /** Set to 'user'. */
    type: string;
    /** The name that is displayed on the audit log in the Confluence UI. */
    displayName?: string;
    /** Always defaults to null. */
    operations?: {};
  };
  /** The IP address of the computer where the event was initiated from. */
  remoteAddress: string;
  /**
   * The creation date-time of the audit record, as a timestamp. This is converted to a date-time display in the
   * Confluence UI. If the `creationDate` is not specified, then it will be set to the timestamp for the current
   * date-time.
   */
  creationDate?: number;
  /** The summary of the event, which is displayed in the 'Change' column on the audit log in the Confluence UI. */
  summary?: string;
  /**
   * A long description of the event, which is displayed in the 'Description' field on the audit log in the Confluence
   * UI.
   */
  description?: string;
  /** The category of the event, which is displayed in the 'Event type' column on the audit log in the Confluence UI. */
  category?: string;
  /** Indicates whether the event was actioned by a system administrator. */
  sysAdmin?: boolean;
  affectedObject?: AffectedObject;
  /** The values that were changed in the event. */
  changedValues?: ChangedValue[];
  /**
   * Objects that were associated with the event. For example, if the event was a space permission change then the
   * associated object would be the space.
   */
  associatedObjects?: AffectedObject[];
}
