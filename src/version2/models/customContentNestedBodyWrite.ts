import { CustomContentBodyWrite } from './customContentBodyWrite';

/**
 * Body of the custom content. Only one body format should be specified as the property* for this object, e.g.
 * `storage`.
 */
export interface CustomContentNestedBodyWrite {
  storage?: CustomContentBodyWrite;
  atlasDocFormat?: CustomContentBodyWrite;
  raw?: CustomContentBodyWrite;
}
