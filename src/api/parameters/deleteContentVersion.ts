export interface DeleteContentVersion {
  /** The ID of the content that the version will be deleted from. */
  id: string;
  /** The number of the version to be deleted. The version number starts
    from 1 up to current version. */
  versionNumber: number;
}
