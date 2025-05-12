import type { OneOrMany } from '~/interfaces';

export interface GetAttachments {
  /** The ID of the content to be queried for its attachments. */
  id: string;
  /** A multi-value parameter indicating which properties of the content to expand. */
  expand?: OneOrMany<
    | 'childTypes.all'
    | 'childTypes.attachment'
    | 'childTypes.comment'
    | 'childTypes.page'
    | 'container'
    | 'metadata'
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
  /** The starting index of the returned attachments. */
  start?: number;
  /** The maximum number of attachments to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
  /** Filter the results to attachments that match the filename. */
  filename?: string;
  /** Filter the results to attachments that match the media type. */
  mediaType?: string;
}
