import type { ContentCreate } from '../models';
import type { OneOrMany } from '~/interfaces';

export interface CreateContent extends ContentCreate {
  /** Filter the returned content by status. */
  status?: string;
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
}
