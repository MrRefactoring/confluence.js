import { CopyPageHierarchyTitleOptions } from './copyPageHierarchyTitleOptions';

export interface CopyPageHierarchyRequest {
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
  /** If set to `true`, descendants are copied to the destination page. */
  copyDescendants?: boolean;
  destinationPageId: string;
  titleOptions?: CopyPageHierarchyTitleOptions;
}
