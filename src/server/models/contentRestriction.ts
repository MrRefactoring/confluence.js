import { Content } from './content';
import { GroupArray } from './groupArray';
import { UserArray } from './userArray';

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
  _links: Record<string, any>;
}
