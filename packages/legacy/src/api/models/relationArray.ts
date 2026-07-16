import type { GenericLinks } from './genericLinks.js';
import type { Relation } from './relation.js';

export interface RelationArray {
  results: Relation[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
