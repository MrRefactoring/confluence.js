import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ContentMacroBody {
  constructor(private client: Client) {}

  /**
   * Returns the body of a macro in storage format, for the given macro ID. This includes information like the name of
   * the macro, the body of the macro, and any macro parameters. This method is mainly used by Cloud apps.
   *
   * About the macro ID: When a macro is created in a new version of content, Confluence will generate a random ID for
   * it, unless an ID is specified (by an app). The macro ID will look similar to this:
   * '50884bd9-0cb8-41d5-98be-f80943c14f96'. The ID is then persisted as new versions of content are created, and is
   * only modified by Confluence if there are conflicting IDs.
   *
   * Note, to preserve backwards compatibility this resource will also match on the hash of the macro body, even if a
   * macro ID is found. This check will eventually become redundant, as macro IDs are generated for pages and
   * transparently propagate out to all instances.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content that the macro is in.
   */
  async getMacroBodyByMacroId<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByMacroId,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the body of a macro in storage format, for the given macro ID. This includes information like the name of
   * the macro, the body of the macro, and any macro parameters. This method is mainly used by Cloud apps.
   *
   * About the macro ID: When a macro is created in a new version of content, Confluence will generate a random ID for
   * it, unless an ID is specified (by an app). The macro ID will look similar to this:
   * '50884bd9-0cb8-41d5-98be-f80943c14f96'. The ID is then persisted as new versions of content are created, and is
   * only modified by Confluence if there are conflicting IDs.
   *
   * Note, to preserve backwards compatibility this resource will also match on the hash of the macro body, even if a
   * macro ID is found. This check will eventually become redundant, as macro IDs are generated for pages and
   * transparently propagate out to all instances.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content that the macro is in.
   */
  async getMacroBodyByMacroId<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByMacroId,
    callback?: never
  ): Promise<T>;
  async getMacroBodyByMacroId<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByMacroId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/history/${parameters.version}/macro/id/${parameters.macroId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
