import type { Attachment } from './attachment.js';
import type { AttachmentContainer } from './attachmentContainer.js';
import type { Version } from './version.js';

export interface CreatedAttachment extends Attachment {
  version: Version;
  container: AttachmentContainer;
}
