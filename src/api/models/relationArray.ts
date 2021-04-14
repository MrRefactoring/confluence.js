import { Relation } from './relation';
import { GenericLinks } from './genericLinks';

export interface RelationArray {
  results: Relation[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
