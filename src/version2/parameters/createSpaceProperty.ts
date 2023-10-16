export interface CreateSpaceProperty {
  /** The ID of the space for which space properties should be returned. */
  spaceId: number;
  /** Key of the space property */
  key: string;
  /** Value of the space property. */
  value: any;
}
