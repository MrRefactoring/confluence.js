import type { ContentBodyCreate } from './contentBodyCreate';
import type { CopyPageRequestDestination } from './copyPageRequestDestination';

export interface CopyPageRequest {
  /** If set to `true`, attachments are copied to the destination page. */
  copyAttachments?: boolean;
  /** If set to `true`, page permissions are copied to the destination page. */
  copyPermissions?: boolean;
  /** If set to `true`, content properties are copied to the destination page. */
  copyProperties?: boolean;
  /** If set to `true`, labels are copied to the destination page. */
  copyLabels?: boolean;
  /** If set to `true`, custom contents are copied to the destination page. */
  copyCustomContents?: boolean;
  destination: CopyPageRequestDestination;
  /** If defined, this will replace the title of the destination page. */
  pageTitle?: string;
  /** If defined, this will replace the body of the destination page. */
  body?: {
    storage?: ContentBodyCreate;
    editor2?: ContentBodyCreate;
  };
}
