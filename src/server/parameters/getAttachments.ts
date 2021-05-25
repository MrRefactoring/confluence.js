export interface GetAttachments {
  /** A comma separated list of properties to expand on the Attachments returned. Optional. */
  expand?: string;
  /** The index of the first item within the result set that should be returned. Optional. */
  start?: number;
  /** How many items should be returned after the start index. Optional. */
  limit?: number;
  /** (optional) filter parameter to return only the Attachment with the matching file name. Optional. */
  filename?: string;
  /** (optional) filter parameter to return only Attachments with a matching Media-Type. Optional. */
  mediaType?: string;
}
