import { Container } from './container';
import { ContentBody } from './contentBody';
import { ContentChildren } from './contentChildren';
import { ContentChildType } from './contentChildType';
import { ContentHistory } from './contentHistory';
import { ContentRestriction } from './contentRestriction';
import { GenericLinks } from './genericLinks';
import { OperationCheckResult } from './operationCheckResult';
import { Space } from './space';
import { Version } from './version';

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
  metadata: Record<string, unknown>;
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
