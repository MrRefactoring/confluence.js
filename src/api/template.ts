import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Template {
  constructor(private client: Client) {}

  /**
   * Creates a new content template. Note, blueprint templates cannot be created via the REST API.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space to create a
   * space template or 'Confluence Administrator' global permission to create a global template.
   */
  async createContentTemplate<T = Models.ContentTemplate>(
    parameters: Parameters.CreateContentTemplate | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a new content template. Note, blueprint templates cannot be created via the REST API.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space to create a
   * space template or 'Confluence Administrator' global permission to create a global template.
   */
  async createContentTemplate<T = Models.ContentTemplate>(
    parameters?: Parameters.CreateContentTemplate,
    callback?: never
  ): Promise<T>;
  async createContentTemplate<T = Models.ContentTemplate>(
    parameters?: Parameters.CreateContentTemplate,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/template',
      method: 'POST',
      data: {
        name: parameters?.name,
        templateType: parameters?.templateType,
        body: parameters?.body,
        description: parameters?.description,
        labels: parameters?.labels,
        space: parameters?.space,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a content template. Note, blueprint templates cannot be updated via the REST API.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space to update a
   * space template or 'Confluence Administrator' global permission to update a global template.
   */
  async updateContentTemplate<T = Models.ContentTemplate>(
    parameters: Parameters.UpdateContentTemplate | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a content template. Note, blueprint templates cannot be updated via the REST API.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space to update a
   * space template or 'Confluence Administrator' global permission to update a global template.
   */
  async updateContentTemplate<T = Models.ContentTemplate>(
    parameters?: Parameters.UpdateContentTemplate,
    callback?: never
  ): Promise<T>;
  async updateContentTemplate<T = Models.ContentTemplate>(
    parameters?: Parameters.UpdateContentTemplate,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/template',
      method: 'PUT',
      data: {
        templateId: parameters?.templateId,
        name: parameters?.name,
        templateType: parameters?.templateType,
        body: parameters?.body,
        description: parameters?.description,
        labels: parameters?.labels,
        space: parameters?.space,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all templates provided by blueprints. Use this method to retrieve all global blueprint templates or all
   * blueprint templates in a space.
   *
   * Note, all global blueprints are inherited by each space. Space blueprints can be customised without affecting the
   * global blueprints.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space to view
   * blueprints for the space and permission to access the Confluence site ('Can use' global permission) to view global
   * blueprints.
   */
  async getBlueprintTemplates<T = Models.BlueprintTemplateArray>(
    parameters: Parameters.GetBlueprintTemplates | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all templates provided by blueprints. Use this method to retrieve all global blueprint templates or all
   * blueprint templates in a space.
   *
   * Note, all global blueprints are inherited by each space. Space blueprints can be customised without affecting the
   * global blueprints.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space to view
   * blueprints for the space and permission to access the Confluence site ('Can use' global permission) to view global
   * blueprints.
   */
  async getBlueprintTemplates<T = Models.BlueprintTemplateArray>(
    parameters?: Parameters.GetBlueprintTemplates,
    callback?: never
  ): Promise<T>;
  async getBlueprintTemplates<T = Models.BlueprintTemplateArray>(
    parameters?: Parameters.GetBlueprintTemplates,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/template/blueprint',
      method: 'GET',
      params: {
        spaceKey: parameters?.spaceKey,
        start: parameters?.start,
        limit: parameters?.limit,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all content templates. Use this method to retrieve all global content templates or all content templates in
   * a space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space to view
   * space templates and permission to access the Confluence site ('Can use' global permission) to view global
   * templates.
   */
  async getContentTemplates<T = Models.ContentTemplateArray>(
    parameters: Parameters.GetContentTemplates | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all content templates. Use this method to retrieve all global content templates or all content templates in
   * a space.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space to view
   * space templates and permission to access the Confluence site ('Can use' global permission) to view global
   * templates.
   */
  async getContentTemplates<T = Models.ContentTemplateArray>(
    parameters?: Parameters.GetContentTemplates,
    callback?: never
  ): Promise<T>;
  async getContentTemplates<T = Models.ContentTemplateArray>(
    parameters?: Parameters.GetContentTemplates,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/template/page',
      method: 'GET',
      params: {
        spaceKey: parameters?.spaceKey,
        start: parameters?.start,
        limit: parameters?.limit,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a content template. This includes information about template, like the name, the space or blueprint that
   * the template is in, the body of the template, and more.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space to view
   * space templates and permission to access the Confluence site ('Can use' global permission) to view global
   * templates.
   */
  async getContentTemplate<T = Models.ContentTemplate>(
    parameters: Parameters.GetContentTemplate,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a content template. This includes information about template, like the name, the space or blueprint that
   * the template is in, the body of the template, and more.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space to view
   * space templates and permission to access the Confluence site ('Can use' global permission) to view global
   * templates.
   */
  async getContentTemplate<T = Models.ContentTemplate>(
    parameters: Parameters.GetContentTemplate,
    callback?: never
  ): Promise<T>;
  async getContentTemplate<T = Models.ContentTemplate>(
    parameters: Parameters.GetContentTemplate,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/template/${parameters.contentTemplateId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a template. This results in different actions depending on the type of template:
   *
   * - If the template is a content template, it is deleted.
   * - If the template is a modified space-level blueprint template, it reverts to the template inherited from the
   *   global-level blueprint template.
   * - If the template is a modified global-level blueprint template, it reverts to the default global-level blueprint
   *   template.
   *
   * Note, unmodified blueprint templates cannot be deleted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space to delete a
   * space template or 'Confluence Administrator' global permission to delete a global template.
   */
  async removeTemplate<T = void>(parameters: Parameters.RemoveTemplate, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a template. This results in different actions depending on the type of template:
   *
   * - If the template is a content template, it is deleted.
   * - If the template is a modified space-level blueprint template, it reverts to the template inherited from the
   *   global-level blueprint template.
   * - If the template is a modified global-level blueprint template, it reverts to the default global-level blueprint
   *   template.
   *
   * Note, unmodified blueprint templates cannot be deleted.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space to delete a
   * space template or 'Confluence Administrator' global permission to delete a global template.
   */
  async removeTemplate<T = void>(parameters: Parameters.RemoveTemplate, callback?: never): Promise<T>;
  async removeTemplate<T = void>(parameters: Parameters.RemoveTemplate, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/template/${parameters.contentTemplateId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
