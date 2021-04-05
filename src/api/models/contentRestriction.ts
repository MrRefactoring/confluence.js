import { UserArray } from './userArray';
import { GroupArray } from './groupArray';
import { Content } from './content';
import { GenericLinks } from './genericLinks';

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
