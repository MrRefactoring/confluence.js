import { ContentRestriction } from './contentRestriction';
import { GenericLinks } from './genericLinks';

export interface ContentRestrictionArray {
  results: ContentRestriction[];
  start: number;
  limit: number;
  size: number;
  /** This property is used by the UI to figure out whether a set of restrictions
    has changed. */
  restrictionsHash: string;
  _links: GenericLinks;
}
