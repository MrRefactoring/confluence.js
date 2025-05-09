import type { OneOrMany } from '~/interfaces';

export interface CreateAttachments {
  /** The ID of the content to add the attachment to. */
  id: string;
  /** The status of the content that the attachment is being added to. */
  status?: 'current' | 'draft' | string;
  /** The attachments to be created. */
  attachments: OneOrMany<{
    file: Buffer | ReadableStream | string | Blob | File;
    filename: string;
    minorEdit: boolean;
    contentType?: string;
    comment?: string;
  }>;
}
