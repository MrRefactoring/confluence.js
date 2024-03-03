import { ContentBodyCreate } from '../models';

export interface AsyncConvertContentBodyRequest extends ContentBodyCreate {
  /** The name of the target format for the content body. */
  to: string;
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
   * If this field is false, the cache will erase its current value and begin a new conversion. If this field is true,
   * the cache will not erase its current value, and will set the status of the async conversion to RERUNNING. Once the
   * data is updated, the status will change to COMPLETED. Large macros that take long to convert, and whose data need
   * not immediately up to date (same as previous conversion's result within last 5 minutes) should set this fields to
   * true. Cache values are stored per user per content body and expansions.
   */
  allowCache?: boolean;
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
