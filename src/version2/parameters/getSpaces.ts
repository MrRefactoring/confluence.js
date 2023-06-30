export interface GetSpaces {
  /** Filter the results to spaces based on their IDs. Multiple IDs can be specified as a comma-separated list. */
  ids?: number[];
  /** Filter the results to spaces based on their keys. Multiple keys can be specified as a comma-separated list. */
  keys?: string[];
  /** Filter the results to spaces based on their type. */
  type?: string;
  /** Filter the results to spaces based on their status. */
  status?: string;
  /** Filter the results to spaces based on their labels. Multiple labels can be specified as a comma-separated list. */
  labels?: string[];
  /** Used to sort the result by a particular field. */
  sort?: 'id' | '-id' | 'key' | '-key' | 'name' | '-name';
  /**
   * The content format type to be returned in the `description` field of the response. If available, the representation
   * will be available under a response field of the same name under the `description` field.
   */
  descriptionFormat?: {};
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /**
   * Maximum number of spaces per result to return. If more results exist, use the `Link` response header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit?: number;
}
