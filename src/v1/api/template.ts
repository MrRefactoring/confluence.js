import { ContentTemplateSchema, type ContentTemplate } from '../models/contentTemplate';
import { BlueprintTemplateArraySchema, type BlueprintTemplateArray } from '../models/blueprintTemplateArray';
import { ContentTemplateArraySchema, type ContentTemplateArray } from '../models/contentTemplateArray';
import type { CreateContentTemplate } from '../parameters/createContentTemplate';
import type { UpdateContentTemplate } from '../parameters/updateContentTemplate';
import type { GetBlueprintTemplates } from '../parameters/getBlueprintTemplates';
import type { GetContentTemplates } from '../parameters/getContentTemplates';
import type { GetContentTemplate } from '../parameters/getContentTemplate';
import type { RemoveTemplate } from '../parameters/removeTemplate';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Creates a new content template. Note, blueprint templates cannot be created via the REST API.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space to create a
 * space template or 'Confluence Administrator' global permission to create a global template.
 */
export async function createContentTemplate(
  client: Client,
  parameters: CreateContentTemplate,
): Promise<ContentTemplate> {
  const config: SendRequestOptions<ContentTemplate> = {
    url: '/wiki/rest/api/template',
    method: 'POST',
    body: {
      name: parameters.name,
      templateType: parameters.templateType,
      body: parameters.body,
      description: parameters.description,
      labels: parameters.labels,
      space: parameters.space,
    },
    schema: ContentTemplateSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a content template. Note, blueprint templates cannot be updated via the REST API.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'Admin' permission for the space to update a
 * space template or 'Confluence Administrator' global permission to update a global template.
 */
export async function updateContentTemplate(
  client: Client,
  parameters: UpdateContentTemplate,
): Promise<ContentTemplate> {
  const config: SendRequestOptions<ContentTemplate> = {
    url: '/wiki/rest/api/template',
    method: 'PUT',
    body: {
      templateId: parameters.templateId,
      name: parameters.name,
      templateType: parameters.templateType,
      body: parameters.body,
      description: parameters.description,
      labels: parameters.labels,
      space: parameters.space,
    },
    schema: ContentTemplateSchema,
  };

  return await client.sendRequest(config);
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
export async function getBlueprintTemplates(
  client: Client,
  parameters?: GetBlueprintTemplates,
): Promise<BlueprintTemplateArray> {
  const config: SendRequestOptions<BlueprintTemplateArray> = {
    url: '/wiki/rest/api/template/blueprint',
    method: 'GET',
    searchParams: {
      spaceKey: parameters?.spaceKey,
      start: parameters?.start,
      limit: parameters?.limit,
      expand: parameters?.expand,
    },
    schema: BlueprintTemplateArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all content templates. Use this method to retrieve all global content templates or all content templates in a
 * space.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space to view space
 * templates and permission to access the Confluence site ('Can use' global permission) to view global templates.
 */
export async function getContentTemplates(
  client: Client,
  parameters?: GetContentTemplates,
): Promise<ContentTemplateArray> {
  const config: SendRequestOptions<ContentTemplateArray> = {
    url: '/wiki/rest/api/template/page',
    method: 'GET',
    searchParams: {
      spaceKey: parameters?.spaceKey,
      start: parameters?.start,
      limit: parameters?.limit,
      expand: parameters?.expand,
    },
    schema: ContentTemplateArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a content template. This includes information about template, like the name, the space or blueprint that the
 * template is in, the body of the template, and more.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: 'View' permission for the space to view space
 * templates and permission to access the Confluence site ('Can use' global permission) to view global templates.
 */
export async function getContentTemplate(client: Client, parameters: GetContentTemplate): Promise<ContentTemplate> {
  const config: SendRequestOptions<ContentTemplate> = {
    url: `/wiki/rest/api/template/${parameters.contentTemplateId}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: ContentTemplateSchema,
  };

  return await client.sendRequest(config);
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
export async function removeTemplate(client: Client, parameters: RemoveTemplate): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/template/${parameters.contentTemplateId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
