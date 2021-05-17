export interface GetAttachments {
  /** The ID of the content to be queried for its attachments. */
  id: string;
  /** A multi-value parameter indicating which properties of the content to expand. */
  expand?: string[];
  /** The starting index of the returned attachments. */
  start?: number;
  /** The maximum number of attachments to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
  /** Filter the results to attachments that match the filename. */
  filename?: string;
  /** Filter the results to attachments that match the media type. */
  mediaType?: string;
}
