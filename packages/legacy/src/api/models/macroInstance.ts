import type { GenericLinks } from './genericLinks.js';

export interface MacroInstance {
  name?: string;
  body?: string;
  parameters?: {};
  _links?: GenericLinks;
}
