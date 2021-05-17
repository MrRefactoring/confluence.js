import { UserArray } from './userArray';

/** Same as UserArray but with `_links` property. */
export interface UserArrayWithLinks extends UserArray {
  _links: Record<string, any>;
}
