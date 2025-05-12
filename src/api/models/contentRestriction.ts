import type { Content } from './content';
import type { GenericLinks } from './genericLinks';
import type { GroupArray } from './groupArray';
import type { UserArray } from './userArray';

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
