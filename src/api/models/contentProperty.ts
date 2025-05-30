import type { Content } from './content';
import type { GenericLinks } from './genericLinks';

export interface ContentProperty {
  id: number;
  key: string;
  /** The value of the content property. This can be empty or a complex object. */
  value: {};
  version?: {
    when: string;
    message: string;
    number: number;
    minorEdit: boolean;
  };
  content?: Content;
  _links: GenericLinks;
}
