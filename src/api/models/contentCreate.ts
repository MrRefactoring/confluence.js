import { ContentBodyCreate } from './contentBodyCreate';

export interface ContentCreate {
  /** The ID of the draft content. Required when publishing a draft. */
  id?: string;
  title: string;
  /** The type of the new content. Custom content types defined by apps are also supported. */
  type: string | 'page' | 'blogpost' | 'comment';
  /** The space that the content is being created in. */
  space: {
    /** The key of the space. */
    key: string;
  };
  /** The status of the new content. */
  status?: string;
  /**
   * The container of the content. Required if type is `comment` or certain types of custom content. If you are trying
   * to create a comment that is a child of another comment, specify the parent comment in the ancestors field, not in
   * this field.
   */
  container?: {
    /** The `id` of the container. */
    id: string;
    /** The `type` of the container. */
    type: string;
  };
  /**
   * The parent content of the new content. If you are creating a top-level `page` or `comment`, this can be left blank.
   * If you are creating a child page, this is where the parent page id goes. If you are creating a child comment, this
   * is where the parent comment id goes. Only one parent content id can be specified.
   */
  ancestors?: {
    /** The `id` of the parent content. */
    id: string;
  }[];
  /**
   * The body of the new content. Does not apply to attachments. Only one body format should be specified as the
   * property for this object, e.g. `storage`.
   *
   * Note, `editor2` format is used by Atlassian only. `anonymous_export_view` is the same as 'export_view' format but
   * only content viewable by an anonymous user is included.
   */
  body?: {
    view?: ContentBodyCreate;
    export_view?: ContentBodyCreate;
    styled_view?: ContentBodyCreate;
    storage?: ContentBodyCreate;
    editor2?: ContentBodyCreate;
    anonymous_export_view?: ContentBodyCreate;
  };
}
