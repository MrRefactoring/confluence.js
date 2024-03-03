export interface GetAndConvertMacroBodyByMacroId {
  /** The ID for the content that contains the macro. */
  id: string;
  /**
   * The version of the content that contains the macro. Specifying `0` as the `version` will return the macro body for
   * the latest content version.
   */
  version: number;
  /**
   * The ID of the macro. This is usually passed by the app that the macro is in. Otherwise, find the macro ID by
   * querying the desired content and version, then expanding the body in storage format. For example,
   * '/content/196611/version/7?expand=content.body.storage'.
   */
  macroId: string;
  /** The content representation to return the macro in. */
  to: string;
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
  embeddedContentRender?: 'current' | 'version-at-save' | string;
  /** A multi-value parameter indicating which properties of the content to expand. */
  expand?:
    | 'childTypes.all'
    | 'childTypes.attachment'
    | 'childTypes.comment'
    | 'childTypes.page'
    | 'container'
    | 'metadata.currentuser'
    | 'metadata.properties'
    | 'metadata.labels'
    | 'metadata.frontend'
    | 'operations'
    | 'children.page'
    | 'children.attachment'
    | 'children.comment'
    | 'restrictions.read.restrictions.user'
    | 'restrictions.read.restrictions.group'
    | 'restrictions.update.restrictions.user'
    | 'restrictions.update.restrictions.group'
    | 'history'
    | 'history.lastUpdated'
    | 'history.previousVersion'
    | 'history.contributors'
    | 'history.nextVersion'
    | 'ancestors'
    | 'body'
    | 'body.storage'
    | 'body.view'
    | 'version'
    | 'descendants.page'
    | 'descendants.attachment'
    | 'descendants.comment'
    | 'space'
    | 'extensions.inlineProperties'
    | 'extensions.resolution'
    | (
        | 'childTypes.all'
        | 'childTypes.attachment'
        | 'childTypes.comment'
        | 'childTypes.page'
        | 'container'
        | 'metadata.currentuser'
        | 'metadata.properties'
        | 'metadata.labels'
        | 'metadata.frontend'
        | 'operations'
        | 'children.page'
        | 'children.attachment'
        | 'children.comment'
        | 'restrictions.read.restrictions.user'
        | 'restrictions.read.restrictions.group'
        | 'restrictions.update.restrictions.user'
        | 'restrictions.update.restrictions.group'
        | 'history'
        | 'history.lastUpdated'
        | 'history.previousVersion'
        | 'history.contributors'
        | 'history.nextVersion'
        | 'ancestors'
        | 'body'
        | 'body.storage'
        | 'body.view'
        | 'version'
        | 'descendants.page'
        | 'descendants.attachment'
        | 'descendants.comment'
        | 'space'
        | 'extensions.inlineProperties'
        | 'extensions.resolution'
      )[]
    | string
    | string[];
}
