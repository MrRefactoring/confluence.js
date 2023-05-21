export interface ContentPropertyUpdateRequest {
  /** Key of the content property */
  key: string;
  /** Value of the content property. */
  value: any;
  /** New version number and associated message */
  version?: {
    /** Version number of the new version. Should be 1 more than the current version number. */
    number?: number;
    /** Message to be associated with the new version. */
    message?: string;
  };
}
