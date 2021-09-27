import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Relation {
  constructor(private client: Client) {}

  /**
   * Returns all target entities that have a particular relationship to the source entity. Note, relationships are one way.
   *
   * For example, the following method finds all content that the current user has an 'ignore' relationship with: `GET
   * https://your-domain.atlassian.net/wiki/rest/api/relation/ignore/from/user/current/to/content` Note, 'ignore' is an
   * example custom relationship type.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity
   * and source entity.
   */
  async findTargetFromSource<T = Models.RelationArray>(
    parameters: Parameters.FindTargetFromSource,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all target entities that have a particular relationship to the source entity. Note, relationships are one way.
   *
   * For example, the following method finds all content that the current user has an 'ignore' relationship with: `GET
   * https://your-domain.atlassian.net/wiki/rest/api/relation/ignore/from/user/current/to/content` Note, 'ignore' is an
   * example custom relationship type.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity
   * and source entity.
   */
  async findTargetFromSource<T = Models.RelationArray>(
    parameters: Parameters.FindTargetFromSource,
    callback?: never
  ): Promise<T>;
  async findTargetFromSource<T = Models.RelationArray>(
    parameters: Parameters.FindTargetFromSource,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/relation/${parameters.relationName}/from/${parameters.sourceType}/${parameters.sourceKey}/to/${parameters.targetType}`,
      method: 'GET',
      params: {
        sourceStatus: parameters.sourceStatus,
        targetStatus: parameters.targetStatus,
        sourceVersion: parameters.sourceVersion,
        targetVersion: parameters.targetVersion,
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'findTargetFromSource' });
  }

  /** @deprecated Will be removed in the next major version. Use `getRelationship` instead. */
  async GetRelationship<T = Models.Relation>(
    parameters: Parameters.GetRelationship,
    callback: Callback<T>
  ): Promise<void>;
  /** @deprecated Will be removed in the next major version. Use `getRelationship` instead. */
  async GetRelationship<T = Models.Relation>(parameters: Parameters.GetRelationship, callback?: never): Promise<T>;
  async GetRelationship<T = Models.Relation>(
    parameters: Parameters.GetRelationship,
    callback?: Callback<T>,
  ): Promise<void | T> {
    return this.getRelationship(parameters, callback!);
  }

  /**
   * Find whether a particular type of relationship exists from a source entity to a target entity. Note, relationships
   * are one way.
   *
   * For example, you can use this method to find whether the current user has selected a particular page as a favorite
   * (i.e. 'save for later'): `GET
   * https://your-domain.atlassian.net/wiki/rest/api/relation/favourite/from/user/current/to/content/123`
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity
   * and source entity.
   */
  async getRelationship<T = Models.Relation>(
    parameters: Parameters.GetRelationship,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Find whether a particular type of relationship exists from a source entity to a target entity. Note, relationships
   * are one way.
   *
   * For example, you can use this method to find whether the current user has selected a particular page as a favorite
   * (i.e. 'save for later'): `GET
   * https://your-domain.atlassian.net/wiki/rest/api/relation/favourite/from/user/current/to/content/123`
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity
   * and source entity.
   */
  async getRelationship<T = Models.Relation>(parameters: Parameters.GetRelationship, callback?: never): Promise<T>;
  async getRelationship<T = Models.Relation>(
    parameters: Parameters.GetRelationship,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/relation/${parameters.relationName}/from/${parameters.sourceType}/${parameters.sourceKey}/to/${parameters.targetType}/${parameters.targetKey}`,
      method: 'GET',
      params: {
        sourceStatus: parameters.sourceStatus,
        targetStatus: parameters.targetStatus,
        sourceVersion: parameters.sourceVersion,
        targetVersion: parameters.targetVersion,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'getRelationship' });
  }

  /**
   * Creates a relationship between two entities (user, space, content). The 'favourite' relationship is supported by
   * default, but you can use this method to create any type of relationship between two entities.
   *
   * For example, the following method creates a 'sibling' relationship between two pieces of content: `GET
   * https://your-domain.atlassian.net/wiki/rest/api/relation/sibling/from/content/123/to/content/456`
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async createRelationship<T = Models.Relation>(
    parameters: Parameters.CreateRelationship,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a relationship between two entities (user, space, content). The 'favourite' relationship is supported by
   * default, but you can use this method to create any type of relationship between two entities.
   *
   * For example, the following method creates a 'sibling' relationship between two pieces of content: `GET
   * https://your-domain.atlassian.net/wiki/rest/api/relation/sibling/from/content/123/to/content/456`
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async createRelationship<T = Models.Relation>(
    parameters: Parameters.CreateRelationship,
    callback?: never
  ): Promise<T>;
  async createRelationship<T = Models.Relation>(
    parameters: Parameters.CreateRelationship,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/relation/${parameters.relationName}/from/${parameters.sourceType}/${parameters.sourceKey}/to/${parameters.targetType}/${parameters.targetKey}`,
      method: 'PUT',
      params: {
        sourceStatus: parameters.sourceStatus,
        targetStatus: parameters.targetStatus,
        sourceVersion: parameters.sourceVersion,
        targetVersion: parameters.targetVersion,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'createRelationship' });
  }

  /** @deprecated Will be removed in the next major version. Use `deleteRelationship` instead. */
  async delete<T = void>(parameters: Parameters.Delete, callback: Callback<T>): Promise<void>;
  /** @deprecated Will be removed in the next major version. Use `deleteRelationship` instead. */
  async delete<T = void>(parameters: Parameters.Delete, callback?: never): Promise<T>;
  async delete<T = void>(parameters: Parameters.Delete, callback?: Callback<T>): Promise<void | T> {
    return this.deleteRelationship(parameters, callback!);
  }

  /**
   * Deletes a relationship between two entities (user, space, content).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). For favourite relationships, the current user can only delete their own favourite
   * relationships. A space administrator can delete favourite relationships for any user.
   */
  async deleteRelationship<T = void>(parameters: Parameters.DeleteRelationship, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a relationship between two entities (user, space, content).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). For favourite relationships, the current user can only delete their own favourite
   * relationships. A space administrator can delete favourite relationships for any user.
   */
  async deleteRelationship<T = void>(parameters: Parameters.DeleteRelationship, callback?: never): Promise<T>;
  async deleteRelationship<T = void>(
    parameters: Parameters.DeleteRelationship,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/relation/${parameters.relationName}/from/${parameters.sourceType}/${parameters.sourceKey}/to/${parameters.targetType}/${parameters.targetKey}`,
      method: 'DELETE',
      params: {
        sourceStatus: parameters.sourceStatus,
        targetStatus: parameters.targetStatus,
        sourceVersion: parameters.sourceVersion,
        targetVersion: parameters.targetVersion,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'deleteRelationship' });
  }

  /**
   * Returns all target entities that have a particular relationship to the source entity. Note, relationships are one way.
   *
   * For example, the following method finds all users that have a 'collaborator' relationship to a piece of content
   * with an ID of '1234': `GET
   * https://your-domain.atlassian.net/wiki/rest/api/relation/collaborator/to/content/1234/from/user` Note,
   * 'collaborator' is an example custom relationship type.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity
   * and source entity.
   */
  async findSourcesForTarget<T = Models.RelationArray>(
    parameters: Parameters.FindSourcesForTarget,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all target entities that have a particular relationship to the source entity. Note, relationships are one way.
   *
   * For example, the following method finds all users that have a 'collaborator' relationship to a piece of content
   * with an ID of '1234': `GET
   * https://your-domain.atlassian.net/wiki/rest/api/relation/collaborator/to/content/1234/from/user` Note,
   * 'collaborator' is an example custom relationship type.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity
   * and source entity.
   */
  async findSourcesForTarget<T = Models.RelationArray>(
    parameters: Parameters.FindSourcesForTarget,
    callback?: never
  ): Promise<T>;
  async findSourcesForTarget<T = Models.RelationArray>(
    parameters: Parameters.FindSourcesForTarget,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/relation/${parameters.relationName}/to/${parameters.targetType}/${parameters.targetKey}/from/${parameters.sourceType}`,
      method: 'GET',
      params: {
        sourceStatus: parameters.sourceStatus,
        targetStatus: parameters.targetStatus,
        sourceVersion: parameters.sourceVersion,
        targetVersion: parameters.targetVersion,
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'findSourcesForTarget' });
  }
}
