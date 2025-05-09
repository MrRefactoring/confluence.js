import type { GenericLinks } from './genericLinks';

export interface MacroInstance {
  name?: string;
  body?: string;
  parameters?: {};
  _links?: GenericLinks;
}
