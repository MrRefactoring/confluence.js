import type { Container } from './container';
import type { ContentBody } from './contentBody';
import type { ContentChildren } from './contentChildren';
import type { ContentChildType } from './contentChildType';
import type { ContentHistory } from './contentHistory';
import type { ContentRestriction } from './contentRestriction';
import type { GenericLinks } from './genericLinks';
import type { OperationCheckResult } from './operationCheckResult';
import type { Space } from './space';
import type { Version } from './version';

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
    atlas_doc_format?: ContentBody;
    _expandable: {
      editor?: string;
      view?: string;
      export_view?: string;
      styled_view?: string;
      storage?: string;
      editor2?: string;
      anonymous_export_view?: string;
      atlas_doc_format?: string;
    };
  };
  restrictions?: {
    read?: ContentRestriction;
    update?: ContentRestriction;
    _links: GenericLinks;
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
  _links?: GenericLinks;
}
