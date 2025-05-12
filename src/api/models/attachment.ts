/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AttachmentMetadata } from './attachmentMetadata';
import type { GenericLinks } from './genericLinks';

export interface Attachment {
  id: string;
  type: 'attachment' | string;
  status: 'current' | string;
  title: string;
  macroRenderedOutput: any;
  metadata: AttachmentMetadata;
  extensions: {
    mediaType: string;
    fileSize: number;
    comment: string;
    mediaTypeDescription: string;
    fileId: string;
    collectionName?: string;
  };
  _expandable: {
    childTypes: string;
    operations: string;
    schedulePublishDate: string;
    children: string;
    restrictions: string;
    history: string;
    ancestors: string;
    body: string;
    descendants: string;
    space: string;
  };
  _links: GenericLinks;
}
