import type { GenericLinks } from './genericLinks';

export interface UserProperty {
  key: string;
  /** The value of the content property. */
  value: {};
  /** A unique identifier for the user property */
  id: string;
  /** Datetime when the property was last modified such as `2022-02-01T12:00:00.111Z` */
  lastModifiedDate: string;
  /** Datetime when the property was created such as `2022-01-01T12:00:00.111Z` */
  createdDate: string;
  Links?: GenericLinks;
}
