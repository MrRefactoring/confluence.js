import type { GenericLinks } from './genericLinks';
import type { Label } from './label';

export interface LabelArray {
  results: Label[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
