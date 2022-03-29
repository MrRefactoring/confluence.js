import { GenericLinks } from './genericLinks';
import { Relation } from './relation';

export interface RelationArray {
  results: Relation[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
