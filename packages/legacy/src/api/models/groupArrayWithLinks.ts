/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GroupArray } from './groupArray.js';

/** Same as GroupArray but with `_links` property. */
export interface GroupArrayWithLinks extends GroupArray {
  _links: Record<string, any>;
}
