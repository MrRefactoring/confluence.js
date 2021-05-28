import { Space } from './space';
import { ContentHistory } from './contentHistory';
import { Version } from './version';
import { OperationCheckResult } from './operationCheckResult';
import { ContentChildren } from './contentChildren';
import { ContentChildType } from './contentChildType';
import { Container } from './container';
import { ContentBody } from './contentBody';
import { ContentRestriction } from './contentRestriction';

/** Base object for all content types. */
export interface Content {
  id: string;
  type: string;
  status: string;
  title: string;
  space?: Space;
  history?: ContentHistory;
  version?: Version;
  ancestors?: Content[];
  operations?: OperationCheckResult[];
  children?: ContentChildren;
  childTypes?: ContentChildType;
  descendants?: ContentChildren;
  container?: Container;
  body?: {
    view?: ContentBody;
    export_view?: ContentBody;
    styled_view?: ContentBody;
    storage?: ContentBody;
    editor2?: ContentBody;
    anonymous_export_view?: ContentBody;
    _expandable: {
      editor?: string;
      view?: string;
      export_view?: string;
      styled_view?: string;
      storage?: string;
      editor2?: string;
      anonymous_export_view?: string;
    };
  };
  restrictions?: {
    read?: ContentRestriction;
    update?: ContentRestriction;
    _links: Record<string, any>;
  };
  _expandable: {
    childTypes?: string;
    container?: string;
    metadata?: string;
    operations?: string;
    children?: string;
    restrictions?: string;
    history?: string;
    ancestors?: string;
    body?: string;
    version?: string;
    descendants?: string;
    space?: string;
  };
  _links?: Record<string, any>;
}
