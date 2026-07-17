import { RelationArraySchema, type RelationArray } from '../models/relationArray';
import { RelationSchema, type Relation } from '../models/relation';
import type { FindTargetFromSource } from '../parameters/findTargetFromSource';
import type { GetRelationship } from '../parameters/getRelationship';
import type { CreateRelationship } from '../parameters/createRelationship';
import type { DeleteRelationship } from '../parameters/deleteRelationship';
import type { FindSourcesForTarget } from '../parameters/findSourcesForTarget';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns all target entities that have a particular relationship to the source entity. Note, relationships are one
 * way.
 *
 * For example, the following method finds all content that the current user has an 'ignore' relationship with: `GET
 * /wiki/rest/api/relation/ignore/from/user/current/to/content` Note, 'ignore' is an example custom relationship type.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity and
 * source entity.
 */
export async function findTargetFromSource(client: Client, parameters: FindTargetFromSource): Promise<RelationArray> {
  const config: SendRequestOptions<RelationArray> = {
    url: `/wiki/rest/api/relation/${parameters.relationName}/from/${parameters.sourceType}/${parameters.sourceKey}/to/${parameters.targetType}`,
    method: 'GET',
    searchParams: {
      sourceStatus: parameters.sourceStatus,
      targetStatus: parameters.targetStatus,
      sourceVersion: parameters.sourceVersion,
      targetVersion: parameters.targetVersion,
      expand: parameters.expand,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: RelationArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Find whether a particular type of relationship exists from a source entity to a target entity. Note, relationships
 * are one way.
 *
 * For example, you can use this method to find whether the current user has selected a particular page as a favorite
 * (i.e. 'save for later'): `GET /wiki/rest/api/relation/favourite/from/user/current/to/content/123`
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity and
 * source entity.
 */
export async function getRelationship(client: Client, parameters: GetRelationship): Promise<Relation> {
  const config: SendRequestOptions<Relation> = {
    url: `/wiki/rest/api/relation/${parameters.relationName}/from/${parameters.sourceType}/${parameters.sourceKey}/to/${parameters.targetType}/${parameters.targetKey}`,
    method: 'GET',
    searchParams: {
      sourceStatus: parameters.sourceStatus,
      targetStatus: parameters.targetStatus,
      sourceVersion: parameters.sourceVersion,
      targetVersion: parameters.targetVersion,
      expand: parameters.expand,
    },
    schema: RelationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a relationship between two entities (user, space, content). The 'favourite' relationship is supported by
 * default, but you can use this method to create any type of relationship between two entities.
 *
 * For example, the following method creates a 'sibling' relationship between two pieces of content: `PUT
 * /wiki/rest/api/relation/sibling/from/content/123/to/content/456`
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function createRelationship(client: Client, parameters: CreateRelationship): Promise<Relation> {
  const config: SendRequestOptions<Relation> = {
    url: `/wiki/rest/api/relation/${parameters.relationName}/from/${parameters.sourceType}/${parameters.sourceKey}/to/${parameters.targetType}/${parameters.targetKey}`,
    method: 'PUT',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      sourceStatus: parameters.sourceStatus,
      targetStatus: parameters.targetStatus,
      sourceVersion: parameters.sourceVersion,
      targetVersion: parameters.targetVersion,
    },
    schema: RelationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a relationship between two entities (user, space, content).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). For favourite relationships, the current user can only delete their own favourite
 * relationships. A space administrator can delete favourite relationships for any user.
 */
export async function deleteRelationship(client: Client, parameters: DeleteRelationship): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/wiki/rest/api/relation/${parameters.relationName}/from/${parameters.sourceType}/${parameters.sourceKey}/to/${parameters.targetType}/${parameters.targetKey}`,
    method: 'DELETE',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      sourceStatus: parameters.sourceStatus,
      targetStatus: parameters.targetStatus,
      sourceVersion: parameters.sourceVersion,
      targetVersion: parameters.targetVersion,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns all target entities that have a particular relationship to the source entity. Note, relationships are one
 * way.
 *
 * For example, the following method finds all users that have a 'collaborator' relationship to a piece of content with
 * an ID of '1234': `GET /wiki/rest/api/relation/collaborator/to/content/1234/from/user` Note, 'collaborator' is an
 * example custom relationship type.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view both the target entity and
 * source entity.
 */
export async function findSourcesForTarget(client: Client, parameters: FindSourcesForTarget): Promise<RelationArray> {
  const config: SendRequestOptions<RelationArray> = {
    url: `/wiki/rest/api/relation/${parameters.relationName}/to/${parameters.targetType}/${parameters.targetKey}/from/${parameters.sourceType}`,
    method: 'GET',
    searchParams: {
      sourceStatus: parameters.sourceStatus,
      targetStatus: parameters.targetStatus,
      sourceVersion: parameters.sourceVersion,
      targetVersion: parameters.targetVersion,
      expand: parameters.expand,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: RelationArraySchema,
  };

  return await client.sendRequest(config);
}
