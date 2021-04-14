export interface VersionRestore {
  /** Set to 'restore'. */
  operationKey: string;
  params: {
    /** The version number to be restored. */
    versionNumber: number;
    /** Description for the version. */
    message: string;
  };
}
