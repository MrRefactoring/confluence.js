import type { OneOrMany } from '~/interfaces';

export interface GetDescendantsOfType {
  /** The ID of the content to be queried for its descendants. */
  id: string;
  /** The type of descendants to return. */
  type: string | 'page' | 'comment' | 'attachment';
  /**
   * Filter the results to descendants upto a desired level of the content. Note, the maximum value supported is 100.
   * root level of the content means immediate (level 1) descendants of the type requested. all represents returning all
   * descendants of the type requested.
   */
  depth?: string;
  /** The starting index of the returned content. */
  start?: number;
  /** The maximum number of content to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
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
}
