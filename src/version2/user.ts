import * as Models from './models';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class User {
  constructor(private client: Client) {}

  /**
   * Returns the list of emails from the input list that do not have access to site.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async checkAccessByEmail<T = Models.CheckAccessByEmail>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the list of emails from the input list that do not have access to site.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async checkAccessByEmail<T = Models.CheckAccessByEmail>(callback?: never): Promise<T>;
  async checkAccessByEmail<T = Models.CheckAccessByEmail>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/user/access/check-access-by-email',
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Invite a list of emails to the site.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async inviteByEmail<T = Models.InviteByEmail>(callback: Callback<T>): Promise<void>;
  /**
   * Invite a list of emails to the site.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async inviteByEmail<T = Models.InviteByEmail>(callback?: never): Promise<T>;
  async inviteByEmail<T = Models.InviteByEmail>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/user/access/invite-by-email',
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }
}
