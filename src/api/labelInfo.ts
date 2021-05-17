import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class LabelInfo {
  constructor(private client: Client) {}

  /**
   * Returns label information and a list of contents associated with the label.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only contents that the user is permitted to view is returned.
   */
  async getAllLabelContent<T = Models.LabelDetails>(
    parameters: Parameters.GetAllLabelContent,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns label information and a list of contents associated with the label.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only contents that the user is permitted to view is returned.
   */
  async getAllLabelContent<T = Models.LabelDetails>(
    parameters: Parameters.GetAllLabelContent,
    callback?: never
  ): Promise<T>;
  async getAllLabelContent<T = Models.LabelDetails>(
    parameters: Parameters.GetAllLabelContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/label',
      method: 'GET',
      params: {
        name: parameters.name,
        type: parameters.type,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getAllLabelContent' });
  }
}
