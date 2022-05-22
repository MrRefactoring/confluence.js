export interface CreateAttachments {
  /** The ID of the content to add the attachment to. */
  id: string;
  /** The status of the content that the attachment is being added to. */
  status?: 'current' | 'draft' | string;
  /** The attachments to be created. */
  attachments: CreateAttachments.Attachment | CreateAttachments.Attachment[];
}

export namespace CreateAttachments {
  export interface Attachment {
    file: Buffer | ReadableStream | string | Blob | File | any;
    filename: string;
    minorEdit: boolean;
    contentType?: string;
    comment?: string;
  }
}
