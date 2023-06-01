import {
  AttachmentMetadata,
  Container,
  Content,
  ContentChildren,
  ContentChildType,
  ContentHistory,
  GenericLinks,
  OperationCheckResult,
  Space,
  Version,
} from '../models';

export interface UpdateAttachmentProperties {
  /** The ID of the content that the attachment is attached to. */
  id: string;
  /** The ID of the attachment to update. */
  attachmentId: string;

  /** @deprecated Use `update` property instead. */
  body?: UpdateAttachmentProperties.Properties;

  update?: UpdateAttachmentProperties.Properties;
}

export namespace UpdateAttachmentProperties {
  export interface Properties {
    [key: string]: any;

    id: string;
    type: 'page' | 'blogpost' | 'attachment' | 'content' | string;
    status: 'current' | 'draft' | string;
    title?: string;
    space?: Space;
    history?: ContentHistory;
    version: Partial<Version>;
    ancestors?: Content[];
    operations?: OperationCheckResult[];
    children?: ContentChildren;
    childTypes?: ContentChildType;
    descendants?: ContentChildren;
    container?: Container;
    body?: any;
    restrictions?: any;
    metadata?: Partial<AttachmentMetadata>;
    macroRenderedOutput?: any;
    extensions?: any;
    _expandable?: {
      childTypes: string;
      container: string;
      metadata: string;
      operations: string;
      children: string;
      restrictions: string;
      history: string;
      ancestors: string;
      body: string;
      version: string;
      descendants: string;
      space: string;
      extensions: string;
      schedulePublishDate: string;
      macroRenderedOutput: string;
    };
    _links?: GenericLinks;
  }
}
