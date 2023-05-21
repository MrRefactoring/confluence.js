import { Attachment } from './attachment';

export interface GetPageAttachments {
  results: Attachment[];
  _links: {
    /**
     * Used for pagination. Contains the relative URL for the next set of results, using a cursor query parameter. This
     * property will not be present if there is no additional data available.
     */
    next?: string;
  };
}
