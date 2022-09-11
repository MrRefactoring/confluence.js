export interface GetAndAsyncConvertMacroBodyByMacroId {
  /** The ID for the content that contains the macro. */
  id: string;
  /**
   * The version of the content that contains the macro. Specifying `0` as the `version` will return the macro body for
   * the latest content version.
   */
  version: number;
  /**
   * The ID of the macro. For apps, this is passed to the macro by the Connect/Forge framework. Otherwise, find the
   * macro ID by querying the desired content and version, then expanding the body in storage format. For example,
   * '/content/196611/version/7?expand=content.body.storage'.
   */
  macroId: string;
  /**
   * The content representation to return the macro in. Currently, the following conversions are allowed:
   *
   *     -`export_view` - `styled_view` - `view`;
   */
  to: string;
  /**
   * If this field is false, the cache will erase its current value and begin a conversion. If this field is true, the
   * cache will not erase its current value, and will set the status of the result in cache to RERUNNING. Once the data
   * is updated, the status will change to COMPLETED. Large macros that take long to convert, and who want to show
   * intermediate, but potentially stale data, immediately should set this field to true. Cache values are stored per
   * macro per user per content and expansions.
   */
  allowCache?: boolean;
  /**
   * The space key used for resolving embedded content (page includes, files, and links) in the content body. For
   * example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>`
   * and the `spaceKeyContext=TEST` parameter is provided, then the link will be converted to a link to the "Example
   * page" page in the "TEST" space.
   */
  spaceKeyContext?: string;
  /**
   * Mode used for rendering embedded content, like attachments.
   *
   *     - `current` renders the embedded content using the latest version.
   *     - `version-at-save` renders the embedded content using the version at
   *     the time of save.
   */
  embeddedContentRender?: string;
  /** A multi-value parameter indicating which properties of the content to expand and populate. */
  expand?:
  | 'embeddedContent'
  | 'mediaToken'
  | 'webresource.superbatch.metatags'
  | 'webresource.superbatch.tags.all'
  | 'webresource.superbatch.tags.css'
  | 'webresource.superbatch.tags.data'
  | 'webresource.superbatch.tags.js'
  | 'webresource.superbatch.uris.all'
  | 'webresource.superbatch.uris.css'
  | 'webresource.superbatch.uris.data'
  | 'webresource.superbatch.uris.js'
  | 'webresource.tags.all'
  | 'webresource.tags.css'
  | 'webresource.tags.data'
  | 'webresource.tags.js'
  | 'webresource.uris.all'
  | 'webresource.uris.css'
  | 'webresource.uris.data'
  | 'webresource.uris.js'
  | (
    | 'embeddedContent'
    | 'mediaToken'
    | 'webresource.superbatch.metatags'
    | 'webresource.superbatch.tags.all'
    | 'webresource.superbatch.tags.css'
    | 'webresource.superbatch.tags.data'
    | 'webresource.superbatch.tags.js'
    | 'webresource.superbatch.uris.all'
    | 'webresource.superbatch.uris.css'
    | 'webresource.superbatch.uris.data'
    | 'webresource.superbatch.uris.js'
    | 'webresource.tags.all'
    | 'webresource.tags.css'
    | 'webresource.tags.data'
    | 'webresource.tags.js'
    | 'webresource.uris.all'
    | 'webresource.uris.css'
    | 'webresource.uris.data'
    | 'webresource.uris.js'
  )[]
  | string
  | string[];
}
