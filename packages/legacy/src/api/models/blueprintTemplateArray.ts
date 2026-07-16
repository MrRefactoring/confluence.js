import type { BlueprintTemplate } from './blueprintTemplate.js';
import type { GenericLinks } from './genericLinks.js';

export interface BlueprintTemplateArray {
  results: BlueprintTemplate[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
