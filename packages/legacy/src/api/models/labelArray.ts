import type { GenericLinks } from './genericLinks.js';
import type { Label } from './label.js';

export interface LabelArray {
  results: Label[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
