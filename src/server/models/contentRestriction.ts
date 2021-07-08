import { UserArray } from './userArray';
import { GroupArray } from './groupArray';
import { Content } from './content';

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
