export interface ConvertContentBody {
  /** The name of the target format for the content body. */
  to: string;

  storage?: any;
  editor?: any;
  view?: any;
  exportView?: any;
  styledView?: any;

  /**
   * A multi-value parameter indicating which properties of the content to expand. Expands are dependent on the to
   * conversion format and may be irrelevant for certain conversions (e.g. macroRenderedOutput is redundant when
   * converting to view format).
   *
   * - `webresource` returns JS and CSS resources necessary for displaying nested content in `view` format
   * - `webresource.superbatch.uris.js` returns all common JS dependencies
   * - `webresource.superbatch.uris.css` returns all common CSS dependencies
   * - `webresource.uris.js` returns JS dependencies specific to conversion
   * - `webresource.uris.css` returns CSS dependencies specific to conversion
   * - `embeddedContent` returns metadata for nested content (e.g. page included using page include macro)
   * - `mediaToken` returns JWT token for retrieving attachment data from Media API
   * - `macroRenderedOutput` additionally converts body to view format
   */
  expand?:
    | 'webresource'
    | 'webresource.superbatch.uris.js'
    | 'webresource.superbatch.uris.css'
    | 'webresource.uris.js'
    | 'webresource.uris.css'
    | 'embeddedContent'
    | 'mediaToken'
    | 'macroRenderedOutput'
    | (
        | 'webresource'
        | 'webresource.superbatch.uris.js'
        | 'webresource.superbatch.uris.css'
        | 'webresource.uris.js'
        | 'webresource.uris.css'
        | 'embeddedContent'
        | 'mediaToken'
        | 'macroRenderedOutput'
      )[]
    | string
    | string[];

  [key: string]: any;
}
