export interface SpacePropertyUpdate {
  /** The value of the property. */
  value: {};
  /** The version number of the property. */
  version: {
    /** The new version for the updated space property. Set this to the
        current version number incremented by one. To get the current
        version number, use 'Get space property' and retrieve
        `version.number`. */
    number: number;
    /** If `minorEdit` is set to 'true', no notification email or activity
        stream will be generated for the change. */
    minorEdit?: boolean;
  };
}
