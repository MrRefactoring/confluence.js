import type { OneOrMany } from '../../interfaces/index.js';

export interface BulkAsyncConvertContentBodyRequest {
  /** The name of the target format for the content body conversion. */
  to: string;
  /** This object is used when creating or updating content. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any> & {
    /** The body of the content in the relevant format. */
    value: string;
    /** The content format type. Set the value of this property to the name of the format being used, e.g. 'storage'. */
    representation:
      | 'view'
      | 'export_view'
      | 'styled_view'
      | 'storage'
      | 'editor'
      | 'editor2'
      | 'anonymous_export_view'
      | 'wiki'
      | 'atlas_doc_format'
      | 'plain'
      | 'raw'
      | string;
  };
  /**
   * A multi-value, comma-separated parameter indicating which properties of the content to expand and populate. Expands
   * are dependent on the `to` conversion format and may be irrelevant for certain conversions (e.g.
   * `macroRenderedOutput` is redundant when converting to `view` format).
   *
   * If rendering to `view` format, and the body content being converted includes arbitrary nested content (such as
   * macros); then it is necessary to include webresource expands in the request. Webresources for content body are the
   * batched JS and CSS dependencies for any nested dynamic content (i.e. macros).
   */
  expand?: OneOrMany<
    | 'embeddedContent'
    | 'mediaToken'
    | 'macroRenderedOutput'
    | 'webresource.superbatch.uris.js'
    | 'webresource.superbatch.uris.css'
    | 'webresource.superbatch.uris.all'
    | 'webresource.superbatch.tags.all'
    | 'webresource.superbatch.tags.css'
    | 'webresource.superbatch.tags.js'
    | 'webresource.uris.js'
    | 'webresource.uris.css'
    | 'webresource.uris.all'
    | 'webresource.tags.all'
    | 'webresource.tags.css'
    | 'webresource.tags.js'
  >;
  /**
   * Mode used for rendering embedded content, such as attachments.
   *
   * - `current` renders the embedded content using the latest version.
   * - `version-at-save renders` the embedded content using the version at the time of save.
   *
   * @default current
   */
  embeddedContentRender?: 'current' | 'version-at-save' | string;
  /**
   * The content ID used to find the space for resolving embedded content (page includes, files, and links) in the
   * content body. For example, if the source content contains the link
   *
   * `<ac:link><ri:page ri:content-title="Example page" /><ac:link>` and the `contentIdContext=123` parameter is
   * provided, then the link will be converted into a link to the "Example page" page in the same space that has the
   * content with ID=123. Note that `spaceKeyContext` will be ignored if this parameter is provided.
   */
  contentIdContext?: string;
  /**
   * The space key used for resolving embedded content (page includes, files, and links) in the content body. For
   * example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>`
   * and the `spaceKeyContext=TEST` parameter is provided, then the link will be converted into a link to the "Example
   * page" page in the "TEST" space.
   */
  spaceKeyContext?: string;
  /**
   * If `false`, the cache will erase its current value and begin a new conversion. If `true`, the cache will not erase
   * its current value, and will set the status of the async conversion to “RERUNNING”. Once the data is updated, the
   * status will change to “COMPLETED”. Large macros that take a long time to convert and that need not be immediately
   * up to date (e.g. a macro in which the new conversion result is the same as a previous conversion result that was
   * completed within the last 5 minutes) should set this field to `true`. Cache values are stored per user per content
   * body and expansions.
   *
   * @default false
   */
  allowCache?: boolean;
}
