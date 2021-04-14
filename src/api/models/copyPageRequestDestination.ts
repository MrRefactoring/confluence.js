/**
 * Defines where the page will be copied to, and can be one of the following types.*
 *
 *   - `parent_page`: page will be copied as a child of the specified parent page
 *   - `space`: page will be copied to the specified space as a root page on the space
 *   - `existing_page`: page will be copied and replace the specified page */
export interface CopyPageRequestDestination {
  type: string;
  /** The space key for `space` type, and content id for `parent_page` and `existing_page` */
  value: string;
}
