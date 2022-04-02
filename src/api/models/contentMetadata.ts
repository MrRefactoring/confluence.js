import { GenericLinks } from './genericLinks';
import { LabelArray } from './labelArray';
import { Version } from './version';

/** Metadata object for page, blogpost, comment content */
export interface ContentMetadata {
  currentuser?: {
    favourited?: {
      isFavourite?: boolean;
      favouritedDate?: string;
    };
    lastmodified?: {
      version?: Version;
      friendlyLastModified?: string;
    };
    lastcontributed?: {
      status?: string;
      when?: string;
    };
    viewed?: {
      lastSeen?: string;
      friendlyLastSeen?: string;
    };
  };
  properties?: GenericLinks;
  frontend?: {};
  labels?: LabelArray;
}
