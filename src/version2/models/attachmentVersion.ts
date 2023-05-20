import { VersionedEntity } from './versionedEntity';

export interface AttachmentVersion {
  /** Date and time when the version was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: string;
  /** Message associated with the current version. */
  message: string;
  /** The version number. */
  number: number;
  /**
   * Describes if this version is a minor version. Email notifications and activity stream updates are not created for
   * minor versions.
   */
  minorEdit: boolean;
  /** The account ID of the user who created this version. */
  authorId: string;
  attachment: VersionedEntity;
}
