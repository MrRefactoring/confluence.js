import type { Attachment } from './attachment';
import type { AttachmentContainer } from './attachmentContainer';
import type { Version } from './version';

export interface CreatedAttachment extends Attachment {
  version: Version;
  container: AttachmentContainer;
}
