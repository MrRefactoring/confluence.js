/**
 * This object represents an icon. If used as a profilePicture, this may be returned as null, depending on the user's privacy setting. */
export interface Icon {
  path: string;
  width: number;
  height: number;
  isDefault: boolean;
}
