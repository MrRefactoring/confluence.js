import { ContentBodyCreate } from './contentBodyCreate';
import { ContentBodyCreateStorage } from './contentBodyCreateStorage';

export interface ContentUpdate {
  /**
   * The new version for the updated content. Set this to the current version number incremented by one, unless you are
   * changing the status to 'draft' which must have a version number of 1.
   *
   * To get the current version number, use [Get content by ID](#api-content-id-get) and retrieve `version.number`.
   */
  version: {
    /** The version number. */
    number: number;
    /** The version comment. */
    message?: string;
  };
  /** The updated title of the content. If you are not changing this field, set this to the current `title`. */
  title: string;
  /** The type of content. Set this to the current type of the content. */
  type: string;
  /**
   * The updated status of the content. Note, if you change the status of a page from 'current' to 'draft' and it has an
   * existing draft, the existing draft will be deleted in favor of the updated page.
   */
  status?: 'current' | 'trashed' | 'historical' | 'draft' | string;
  /** The new parent for the content. Only one parent content 'id' can be specified. */
  ancestors?: {
    /** The `id` of the parent content. */
    id: string;
  }[];
  /**
   * The updated body of the content. Does not apply to attachments. If you are not sure how to generate these formats,
   * you can create a page in the Confluence application, retrieve the content using [Get content](#api-content-get),
   * and expand the desired content format, e.g. `expand=body.storage`.
   */
  body?: {
    view?: ContentBodyCreate;
    export_view?: ContentBodyCreate;
    styled_view?: ContentBodyCreate;
    storage?: ContentBodyCreateStorage;
    editor2?: ContentBodyCreate;
    anonymous_export_view?: ContentBodyCreate;
    atlas_doc_format?: ContentBodyCreate;
  };
}
