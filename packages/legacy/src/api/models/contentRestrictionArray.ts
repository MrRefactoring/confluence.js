import type { ContentRestriction } from './contentRestriction.js';
import type { GenericLinks } from './genericLinks.js';

export interface ContentRestrictionArray {
  results: ContentRestriction[];
  start: number;
  limit: number;
  size: number;
  /** This property is used by the UI to figure out whether a set of restrictions has changed. */
  restrictionsHash: string;
  _links: GenericLinks;
}
