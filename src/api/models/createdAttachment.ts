import { Attachment } from './attachment';
import { AttachmentContainer } from './attachmentContainer';
import { Version } from './version';

export interface CreatedAttachment extends Attachment {
  version: Version;
  container: AttachmentContainer;
}
