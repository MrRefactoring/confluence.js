export interface CreateAttachments {
  id: string | number;
  /** A string containing the status of the attachments content container, supports current or draft, defaults to current */
  status?: string;

  [key: string]: any;
}
