import { Space } from './space';

export interface SpaceProperty {
  id: number;
  key: string;
  value: {};
  version?: {
    when: string;
    message: string;
    number: number;
    minorEdit: boolean;
  };
  space?: Space;
  _expandable: {
    version?: string;
    space?: string;
  };
}
