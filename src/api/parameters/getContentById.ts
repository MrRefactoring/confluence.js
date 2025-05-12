import type { OneOrMany } from '~/interfaces';

export interface GetContentById {
  /**
   * The ID of the content to be returned. If you don't know the content ID, use [Get content](#api-content-get) and
   * filter the results.
   */
  id: string;
  /**
   * Filter the results to a set of content based on their status. If set to `any`, content with any status is returned.
   * Note, the `historical` status is currently not supported.
   */
  status?: string[];
  /** The version number of the content to be returned. */
  version?: number;
  /**
   * The version of embedded content (e.g. attachments) to render.
   *
   * - <code>current</code> renders the latest version of the embedded content.
   * - <code>version-at-save</code> renders the version of the embedded content at the time of save.
   */
  embeddedContentRender?: string;
  /** A multi-value parameter indicating which properties of the content to expand. */
  expand?: OneOrMany<
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
    | 'version'
    | 'descendants.page'
    | 'descendants.attachment'
    | 'descendants.comment'
    | 'space'
    | 'extensions.inlineProperties'
    | 'extensions.resolution'
    | string
  >;
  /**
   * If set to `viewed`, the request will trigger a 'viewed' event for the content. When this event is triggered, the
   * page/blogpost will appear on the 'Recently visited' tab of the user's Confluence dashboard.
   */
  trigger?: string;
}
