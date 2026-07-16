import type * as Models from './models/index.js';
import type * as Parameters from './parameters/index.js';
import type { Client } from '../clients/index.js';
import type { Callback } from '../callback.js';
import type { RequestConfig } from '../requestConfig.js';

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
   * For Forge macros, the value for macro ID is the "local ID" of that particular ADF node. This value can be retrieved
   * either client-side by calling view.getContext() and accessing "localId" on the resulting object, or server-side by
   * examining the "local-id" parameter node inside the "parameters" node.
   *
   * Note that there are other attributes named "local-id", but only this particular one is used to store the macro ID.
   *
   * Example: <ac:adf-node type="extension"> <ac:adf-attribute
   * key="extension-type">com.atlassian.ecosystem</ac:adf-attribute> <ac:adf-attribute key="parameters">
   * <ac:adf-parameter key="local-id">e9c4aa10-73fa-417c-888d-48c719ae4165</ac:adf-parameter> </ac:adf-parameter>
   * </ac:adf-node>
   *
   * Note, to preserve backwards compatibility this resource will also match on the hash of the macro body, even if a
   * macro ID is found. This check will eventually become redundant, as macro IDs are generated for pages and
   * transparently propagate out to all instances.
   *
   * This backwards compatibility logic does not apply to Forge macros; those can only be retrieved by their ID.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content that the
   * macro is in.
   */
  async getMacroBodyByMacroId<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByMacroId,
    callback: Callback<T>,
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
   * For Forge macros, the value for macro ID is the "local ID" of that particular ADF node. This value can be retrieved
   * either client-side by calling view.getContext() and accessing "localId" on the resulting object, or server-side by
   * examining the "local-id" parameter node inside the "parameters" node.
   *
   * Note that there are other attributes named "local-id", but only this particular one is used to store the macro ID.
   *
   * Example: <ac:adf-node type="extension"> <ac:adf-attribute
   * key="extension-type">com.atlassian.ecosystem</ac:adf-attribute> <ac:adf-attribute key="parameters">
   * <ac:adf-parameter key="local-id">e9c4aa10-73fa-417c-888d-48c719ae4165</ac:adf-parameter> </ac:adf-parameter>
   * </ac:adf-node>
   *
   * Note, to preserve backwards compatibility this resource will also match on the hash of the macro body, even if a
   * macro ID is found. This check will eventually become redundant, as macro IDs are generated for pages and
   * transparently propagate out to all instances.
   *
   * This backwards compatibility logic does not apply to Forge macros; those can only be retrieved by their ID.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content that the
   * macro is in.
   */
  async getMacroBodyByMacroId<T = Models.MacroInstance>(
    parameters: Parameters.GetMacroBodyByMacroId,
    callback?: never,
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

  /**
   * Returns the body of a macro in format specified in path, for the given macro ID. This includes information like the
   * name of the macro, the body of the macro, and any macro parameters.
   *
   * About the macro ID: When a macro is created in a new version of content, Confluence will generate a random ID for
   * it, unless an ID is specified (by an app). The macro ID will look similar to this:
   * '50884bd9-0cb8-41d5-98be-f80943c14f96'. The ID is then persisted as new versions of content are created, and is
   * only modified by Confluence if there are conflicting IDs.
   *
   * For Forge macros, the value for macro ID is the "local ID" of that particular ADF node. This value can be retrieved
   * either client-side by calling view.getContext() and accessing "localId" on the resulting object, or server-side by
   * examining the "local-id" parameter node inside the "parameters" node.
   *
   * Note that there are other attributes named "local-id", but only this particular one is used to store the macro ID.
   *
   * Example: <ac:adf-node type="extension"> <ac:adf-attribute
   * key="extension-type">com.atlassian.ecosystem</ac:adf-attribute> <ac:adf-attribute key="parameters">
   * <ac:adf-parameter key="local-id">e9c4aa10-73fa-417c-888d-48c719ae4165</ac:adf-parameter> </ac:adf-parameter>
   * </ac:adf-node>
   *
   * Note, to preserve backwards compatibility this resource will also match on the hash of the macro body, even if a
   * macro ID is found. This check will eventually become redundant, as macro IDs are generated for pages and
   * transparently propagate out to all instances.
   *
   * This backwards compatibility logic does not apply to Forge macros; those can only be retrieved by their ID.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content that the
   * macro is in.
   */
  async getAndConvertMacroBodyByMacroId<T = Models.ContentBody>(
    parameters: Parameters.GetAndConvertMacroBodyByMacroId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the body of a macro in format specified in path, for the given macro ID. This includes information like the
   * name of the macro, the body of the macro, and any macro parameters.
   *
   * About the macro ID: When a macro is created in a new version of content, Confluence will generate a random ID for
   * it, unless an ID is specified (by an app). The macro ID will look similar to this:
   * '50884bd9-0cb8-41d5-98be-f80943c14f96'. The ID is then persisted as new versions of content are created, and is
   * only modified by Confluence if there are conflicting IDs.
   *
   * For Forge macros, the value for macro ID is the "local ID" of that particular ADF node. This value can be retrieved
   * either client-side by calling view.getContext() and accessing "localId" on the resulting object, or server-side by
   * examining the "local-id" parameter node inside the "parameters" node.
   *
   * Note that there are other attributes named "local-id", but only this particular one is used to store the macro ID.
   *
   * Example: <ac:adf-node type="extension"> <ac:adf-attribute
   * key="extension-type">com.atlassian.ecosystem</ac:adf-attribute> <ac:adf-attribute key="parameters">
   * <ac:adf-parameter key="local-id">e9c4aa10-73fa-417c-888d-48c719ae4165</ac:adf-parameter> </ac:adf-parameter>
   * </ac:adf-node>
   *
   * Note, to preserve backwards compatibility this resource will also match on the hash of the macro body, even if a
   * macro ID is found. This check will eventually become redundant, as macro IDs are generated for pages and
   * transparently propagate out to all instances.
   *
   * This backwards compatibility logic does not apply to Forge macros; those can only be retrieved by their ID.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content that the
   * macro is in.
   */
  async getAndConvertMacroBodyByMacroId<T = Models.ContentBody>(
    parameters: Parameters.GetAndConvertMacroBodyByMacroId,
    callback?: never,
  ): Promise<T>;
  async getAndConvertMacroBodyByMacroId<T = Models.ContentBody>(
    parameters: Parameters.GetAndConvertMacroBodyByMacroId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/history/${parameters.version}/macro/id/${parameters.macroId}/convert/${parameters.to}`,
      method: 'GET',
      params: {
        spaceKeyContext: parameters.spaceKeyContext,
        embeddedContentRender: parameters.embeddedContentRender,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns Async Id of the conversion task which will convert the macro into a content body of the desired format. The
   * result will be available for 5 minutes after completion of the conversion.
   *
   * About the macro ID: When a macro is created in a new version of content, Confluence will generate a random ID for
   * it, unless an ID is specified (by an app). The macro ID will look similar to this:
   * '884bd9-0cb8-41d5-98be-f80943c14f96'. The ID is then persisted as new versions of content are created, and is only
   * modified by Confluence if there are conflicting IDs.
   *
   * For Forge macros, the value for macro ID is the "local ID" of that particular ADF node. This value can be retrieved
   * either client-side by calling view.getContext() and accessing "localId" on the resulting object, or server-side by
   * examining the "local-id" parameter node inside the "parameters" node.
   *
   * Note that there are other attributes named "local-id", but only this particular one is used to store the macro ID.
   *
   * Example: <ac:adf-node type="extension"> <ac:adf-attribute
   * key="extension-type">com.atlassian.ecosystem</ac:adf-attribute> <ac:adf-attribute key="parameters">
   * <ac:adf-parameter key="local-id">e9c4aa10-73fa-417c-888d-48c719ae4165</ac:adf-parameter> </ac:adf-parameter>
   * </ac:adf-node>
   *
   * Note, to preserve backwards compatibility this resource will also match on the hash of the macro body, even if a
   * macro ID is found. This check will eventually become redundant, as macro IDs are generated for pages and
   * transparently propagate out to all instances.
   *
   * This backwards compatibility logic does not apply to Forge macros; those can only be retrieved by their ID.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content that the
   * macro is in.
   */
  async getAndAsyncConvertMacroBodyByMacroId<T = Models.AsyncId>(
    parameters: Parameters.GetAndAsyncConvertMacroBodyByMacroId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns Async Id of the conversion task which will convert the macro into a content body of the desired format. The
   * result will be available for 5 minutes after completion of the conversion.
   *
   * About the macro ID: When a macro is created in a new version of content, Confluence will generate a random ID for
   * it, unless an ID is specified (by an app). The macro ID will look similar to this:
   * '884bd9-0cb8-41d5-98be-f80943c14f96'. The ID is then persisted as new versions of content are created, and is only
   * modified by Confluence if there are conflicting IDs.
   *
   * For Forge macros, the value for macro ID is the "local ID" of that particular ADF node. This value can be retrieved
   * either client-side by calling view.getContext() and accessing "localId" on the resulting object, or server-side by
   * examining the "local-id" parameter node inside the "parameters" node.
   *
   * Note that there are other attributes named "local-id", but only this particular one is used to store the macro ID.
   *
   * Example: <ac:adf-node type="extension"> <ac:adf-attribute
   * key="extension-type">com.atlassian.ecosystem</ac:adf-attribute> <ac:adf-attribute key="parameters">
   * <ac:adf-parameter key="local-id">e9c4aa10-73fa-417c-888d-48c719ae4165</ac:adf-parameter> </ac:adf-parameter>
   * </ac:adf-node>
   *
   * Note, to preserve backwards compatibility this resource will also match on the hash of the macro body, even if a
   * macro ID is found. This check will eventually become redundant, as macro IDs are generated for pages and
   * transparently propagate out to all instances.
   *
   * This backwards compatibility logic does not apply to Forge macros; those can only be retrieved by their ID.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content that the
   * macro is in.
   */
  async getAndAsyncConvertMacroBodyByMacroId<T = Models.AsyncId>(
    parameters: Parameters.GetAndAsyncConvertMacroBodyByMacroId,
    callback?: never,
  ): Promise<T>;
  async getAndAsyncConvertMacroBodyByMacroId<T = Models.AsyncId>(
    parameters: Parameters.GetAndAsyncConvertMacroBodyByMacroId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/history/${parameters.version}/macro/id/${parameters.macroId}/convert/async/${parameters.to}`,
      method: 'GET',
      params: {
        allowCache: parameters.allowCache,
        spaceKeyContext: parameters.spaceKeyContext,
        embeddedContentRender: parameters.embeddedContentRender,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
