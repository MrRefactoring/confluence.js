import { Version } from './version';

export interface ContentProperty {
  /** ID of the property */
  id: string;
  /** Key of the property */
  key: string;
  /** Value of the property. Must be a valid JSON value. */
  value: any;
  version: Version;
}
