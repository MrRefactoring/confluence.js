import { ContentBodyCreate } from '../models';

export interface ConvertContentBody extends ContentBodyCreate {
  /** The name of the target format for the content body. */
  to: string;

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

  /**
   * The space key used for resolving embedded content (page includes, files, and links) in the content body. For
   * example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>`
   * and the `spaceKeyContext=TEST` parameter is provided, then the link will be converted to a link to the "Example
   * page" page in the "TEST" space.
   */
  spaceKeyContext?: string;
  /**
   * The content ID used to find the space for resolving embedded content (page includes, files, and links) in the
   * content body. For example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example
   * page" /><ac:link>` and the `contentIdContext=123` parameter is provided, then the link will be converted to a link
   * to the "Example page" page in the same space that has the content with ID=123. Note, `spaceKeyContext` will be
   * ignored if this parameter is provided.
   */
  contentIdContext?: string;
  /**
   * Mode used for rendering embedded content, like attachments.
   *
   * - `current` renders the embedded content using the latest version.
   * - `version-at-save` renders the embedded content using the version at the time of save.
   */
  embeddedContentRender?: string;

  additionalProperties?: any[];
}
