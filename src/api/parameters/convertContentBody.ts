import { ContentBodyCreate } from '../models';

export interface ConvertContentBody extends ContentBodyCreate {
  /** The name of the target format for the content body. */
  to: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
  /** The space key used for resolving embedded content (page includes,
    files, and links) in the content body. For example, if the source content
    contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>`
    and the `spaceKeyContext=TEST` parameter is provided, then the link
    will be converted to a link to the "Example page" page in the "TEST" space. */
  spaceKeyContext?: string;
  /** The content ID used to find the space for resolving embedded content
    (page includes, files, and links) in the content body. For example,
    if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>`
    and the `contentIdContext=123` parameter is provided, then the link
    will be converted to a link to the "Example page" page in the same space
    that has the content with ID=123. Note, `spaceKeyContext` will be ignored
    if this parameter is provided. */
  contentIdContext?: string;
  /** Mode used for rendering embedded content, like attachments.

    - `current` renders the embedded content using the latest version.
    - `version-at-save` renders the embedded content using the version at
    the time of save. */
  embeddedContentRender?: string;
}
