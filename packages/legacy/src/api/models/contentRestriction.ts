import type { Content } from './content.js';
import type { GenericLinks } from './genericLinks.js';
import type { GroupArray } from './groupArray.js';
import type { UserArray } from './userArray.js';

export interface ContentRestriction {
  operation: string;
  restrictions?: {
    user?: UserArray;
    group?: GroupArray;
    _expandable?: {
      user?: string;
      group?: string;
    };
  };
  content?: Content;
  _expandable: {
    restrictions?: string;
    content?: string;
  };
  _links: GenericLinks;
}
