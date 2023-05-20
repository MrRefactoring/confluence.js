import { PageBodyWrite } from './pageBodyWrite';

/** Body of the page. Only one body format should be specified as the property* for this object, e.g. `storage`. */
export interface PageNestedBodyWrite {
  storage?: PageBodyWrite;
  atlasDocFormat?: PageBodyWrite;
  wiki?: PageBodyWrite;
}
