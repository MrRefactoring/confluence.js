import { LabelCreateArray } from '../models';

export interface AddLabelsToContent {
  /** The ID of the content that will have labels added to it. */
  id: string;
  /** If true, return the new 400 error response on invalid requests. Otherwise return a server error response
    on invalid requests.

    Why does this parameter exist? Previously, our API was returning a 500 status code with
    a difficult-to-consume response body. We've fixed the response to have a 400 status code and a more useful
    body. This parameter enables a smooth transition without a breaking change; eventually, we'll
    completely remove the 500 response and this parameter won't be needed. */
  'use-400-error-response'?: boolean;
  body: LabelCreateArray;
}
