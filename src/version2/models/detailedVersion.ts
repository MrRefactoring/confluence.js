export interface DetailedVersion {
  /** The current version number. */
  number?: number;
  /** The account ID of the user who created this version. */
  authorId?: string;
  /** Message associated with the current version. */
  message?: string;
  /** Date and time when the version was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt?: string;
  /**
   * Describes if this version is a minor version. Email notifications and activity stream updates are not created for
   * minor versions.
   */
  minorEdit?: boolean;
  /** Describes if the content type is modified in this version (e.g. page to blog) */
  contentTypeModified?: boolean;
  /** The account IDs of users that collaborated on this version. */
  collaborators?: string[];
  /** The version number of the version prior to this current content update. */
  prevVersion?: number;
  /** The version number of the version after this current content update. */
  nextVersion?: number;
}
