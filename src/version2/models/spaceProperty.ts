export interface SpaceProperty {
  /** ID of the space property. */
  id?: {};
  /** Key of the space property. */
  key?: string;
  /** Value of the space property. */
  value?: {};
  /** RFC3339 compliant date time at which the property was created. */
  createdAt?: string;
  /** Atlassian account ID of the user that created the space property. */
  createdBy?: string;
  version?: {
    /** RFC3339 compliant date time at which the property's current version was created. */
    createdAt?: string;
    /** Atlassian account ID of the user that created the space property's current version. */
    createdBy?: string;
    /** Message associated with the current version. */
    message?: string;
    /** The space property's current version number. */
    number?: number;
  };
}
