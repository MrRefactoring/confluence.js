export interface AttachmentUpdate {
  /** The attachment version. Set this to the current version number of the
   attachment. Note, the version number only needs to be incremented when
   updating the actual attachment, not its properties. */
  version: {
    /** The version number. */
    number: number;
  };
  /** The ID of the attachment to be updated. */
  id: string;
  /** Set this to `attachment`. */
  type: string;
  /** The updated name of the attachment. */
  title?: string;
  metadata?: {
    /** The media type of the attachment, e.g. 'img/jpg'. */
    mediaType?: string;
    /** The comment for this update. */
    comment?: string;
  };
  /** The new content to attach the attachment to. */
  container?: {
    /** The `id` of the parent content. */
    id: string;
    /** The content type. You can only attach attachments to content
     of type: `page`, `blogpost`. */
    type: string;
  };
}
