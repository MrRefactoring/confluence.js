import { Version } from './version';

export interface ContentProperty {
  /** ID of the property */
  id?: number;
  /** Key of the property */
  key?: string;
  /** Value of the property. Must be a valid JSON value. */
  value?: {};
  version?: Version;
}
