import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '@confluence.js/core';
import type { createCloudV2Client } from '@confluence.js/cloud';
import { getLiveClient } from './setup/client';
import { ResourceTracker } from './setup/resources';
import { createTestSpace, type TestSpace } from './setup/fixtures';
import { runId } from './helpers/naming';
import { waitFor } from './helpers/poll';

/**
 * Live integration suite for the Confluence Cloud v2 `spaceProperties` API (`getSpaceProperties`,
 * `createSpaceProperty`, `getSpacePropertyById`, `updateSpacePropertyById`, `deleteSpacePropertyById`).
 *
 * Space properties are an arbitrary key/value (JSON) store hung off a space. The suite drives the full CRUD lifecycle
 * against a throwaway space and asserts the _contract_ of each method rather than mere resolution:
 *
 * - Created entities are typed exactly as the Zod `SpaceProperty` model declares (`id`/`key`/`authorId` strings,
 *   `version.number` a number, `createdAt` a Date);
 * - The `value` payload round-trips byte-for-byte for both an object and a primitive (the value is `z.unknown()`, so the
 *   server echoes arbitrary JSON);
 * - A freshly created property is discoverable via both the listing and the canonical by-id read, and the two agree;
 * - `updateSpacePropertyById` bumps `version.number` and replaces `value`;
 * - `deleteSpacePropertyById` removes it, after which a by-id read 404s as a typed `ApiError`.
 *
 * ID gotcha: model ids are numeric _strings_ (`SpaceProperty.id`, `space.id`), but every path-id parameter is
 * `z.number()`, so each is wrapped in `Number(...)`.
 */

let client: ReturnType<typeof createCloudV2Client>;
const tracker = new ResourceTracker();
let space: TestSpace;

/** A meaningful structural check for a SpaceProperty returned by the API. */
function expectWellFormedProperty(property: Awaited<ReturnType<typeof client.spaceProperties.getSpacePropertyById>>) {
  expect(typeof property.id).toBe('string');
  expect(property.id).toBeTruthy();
  expect(typeof property.key).toBe('string');
  expect(property.key).toBeTruthy();
  // `version` is `.nullish()` in the model; a real property always carries one.
  expect(property.version).toBeTruthy();
  expect(typeof property.version?.number).toBe('number');
  // `createdAt` is declared `z.coerce.date()`, so a parsed response yields a real Date.
  expect(property.createdAt).toBeInstanceOf(Date);
  // The live API returns the creator as `authorId` (top-level and inside `version`).
  expect(typeof property.authorId).toBe('string');
}

beforeAll(async () => {
  client = getLiveClient();
  space = await createTestSpace(tracker);
});

afterAll(() => tracker.cleanup());

describe('Confluence Cloud v2 — spaceProperties CRUD (live, full lifecycle)', () => {
  const key = 'cfjs.test';
  const initialValue = { any: 'json', n: 1 };
  let created: Awaited<ReturnType<typeof client.spaceProperties.createSpaceProperty>>;

  beforeAll(async () => {
    created = await client.spaceProperties.createSpaceProperty({
      spaceId: Number(space.id),
      key,
      value: initialValue,
    });

    tracker.defer(async () => {
      await client.spaceProperties
        .deleteSpacePropertyById({ spaceId: Number(space.id), propertyId: Number(created.id) })
        .catch(() => undefined);
    });
  });

  describe('createSpaceProperty', () => {
    it('returns a populated, correctly-typed SpaceProperty echoing the submitted key/value', () => {
      expectWellFormedProperty(created);
      expect(created.key).toBe(key);
      // `value` is `z.unknown()`; arbitrary JSON is echoed back verbatim.
      expect(created.value).toEqual(initialValue);
      // A brand-new property starts at version 1.
      expect(created.version?.number).toBe(1);
    });
  });

  describe('getSpaceProperties', () => {
    it('lists the freshly created property with its typed fields intact', async () => {
      const page = await waitFor(
        () => client.spaceProperties.getSpaceProperties({ spaceId: Number(space.id) }),
        p => (p.results ?? []).some(prop => prop.id === created.id),
      );

      expect(Array.isArray(page.results)).toBe(true);
      expect(page._links).toBeDefined();

      const listed = page.results!.find(prop => prop.id === created.id);
      expect(listed).toBeDefined();
      expect(listed!.key).toBe(key);
      expect(listed!.value).toEqual(initialValue);
      expect(listed!.version?.number).toBe(1);
    });

    it('filters by `key` — returns only the matching property', async () => {
      const page = await client.spaceProperties.getSpaceProperties({ spaceId: Number(space.id), key });

      expect(page.results!.length).toBeGreaterThan(0);
      expect(page.results!.every(prop => prop.key === key)).toBe(true);
      expect(page.results!.some(prop => prop.id === created.id)).toBe(true);
    });

    it('honors `limit` without erroring on a small page size', async () => {
      const page = await client.spaceProperties.getSpaceProperties({ spaceId: Number(space.id), limit: 1 });

      expect(page.results?.length ?? 0).toBeLessThanOrEqual(1);
    });
  });

  describe('getSpacePropertyById', () => {
    it('returns the same canonical entity as the create response', async () => {
      const fetched = await client.spaceProperties.getSpacePropertyById({
        spaceId: Number(space.id),
        propertyId: Number(created.id),
      });

      expectWellFormedProperty(fetched);
      expect(fetched.id).toBe(created.id);
      expect(fetched.key).toBe(created.key);
      expect(fetched.value).toEqual(initialValue);
      expect(fetched.version?.number).toBe(created.version?.number);
    });
  });

  describe('updateSpacePropertyById', () => {
    const updatedValue = { any: 'changed', n: 2, nested: { ok: true } };
    let updated: Awaited<ReturnType<typeof client.spaceProperties.updateSpacePropertyById>>;

    beforeAll(async () => {
      const current = await client.spaceProperties.getSpacePropertyById({
        spaceId: Number(space.id),
        propertyId: Number(created.id),
      });

      updated = await client.spaceProperties.updateSpacePropertyById({
        spaceId: Number(space.id),
        propertyId: Number(created.id),
        key,
        value: updatedValue,
        version: { number: (current.version!.number ?? 1) + 1 },
      });
    });

    it('replaces the value and bumps the version number', () => {
      expectWellFormedProperty(updated);
      expect(updated.id).toBe(created.id);
      expect(updated.key).toBe(key);
      expect(updated.value).toEqual(updatedValue);
      expect(updated.version?.number).toBe(2);
    });

    it('persists the new value and version on a subsequent by-id read', async () => {
      const refetched = await client.spaceProperties.getSpacePropertyById({
        spaceId: Number(space.id),
        propertyId: Number(created.id),
      });

      expect(refetched.value).toEqual(updatedValue);
      expect(refetched.value).not.toEqual(initialValue);
      expect(refetched.version?.number).toBe(2);
    });
  });

  describe('deleteSpacePropertyById', () => {
    it('removes the property — a subsequent by-id read 404s as a typed ApiError', async () => {
      await client.spaceProperties.deleteSpacePropertyById({
        spaceId: Number(space.id),
        propertyId: Number(created.id),
      });

      let caught: unknown;
      try {
        await client.spaceProperties.getSpacePropertyById({
          spaceId: Number(space.id),
          propertyId: Number(created.id),
        });
      } catch (error) {
        caught = error;
      }

      expect(caught).toBeInstanceOf(ApiError);
      expect((caught as ApiError).status).toBe(404);
    });
  });
});

describe('Confluence Cloud v2 — spaceProperties value round-trip (live)', () => {
  it('round-trips an object value through create → get unchanged', async () => {
    const objectValue = { kind: 'object', items: [1, 2, 3], flag: false, meta: { a: 'b' } };

    const property = await client.spaceProperties.createSpaceProperty({
      spaceId: Number(space.id),
      key: `cfjs.obj.${runId()}`,
      value: objectValue,
    });
    tracker.defer(async () => {
      await client.spaceProperties
        .deleteSpacePropertyById({ spaceId: Number(space.id), propertyId: Number(property.id) })
        .catch(() => undefined);
    });

    expect(property.value).toEqual(objectValue);

    const fetched = await client.spaceProperties.getSpacePropertyById({
      spaceId: Number(space.id),
      propertyId: Number(property.id),
    });
    expect(fetched.value).toEqual(objectValue);
  });

  it('round-trips a primitive (string) value through create → get unchanged', async () => {
    const primitiveValue = 'just-a-plain-string';

    const property = await client.spaceProperties.createSpaceProperty({
      spaceId: Number(space.id),
      key: `cfjs.str.${runId()}`,
      value: primitiveValue,
    });
    tracker.defer(async () => {
      await client.spaceProperties
        .deleteSpacePropertyById({ spaceId: Number(space.id), propertyId: Number(property.id) })
        .catch(() => undefined);
    });

    expect(property.value).toBe(primitiveValue);

    const fetched = await client.spaceProperties.getSpacePropertyById({
      spaceId: Number(space.id),
      propertyId: Number(property.id),
    });
    expect(fetched.value).toBe(primitiveValue);
  });

  it('round-trips a primitive (number) value through create → get unchanged', async () => {
    const numberValue = 42;

    const property = await client.spaceProperties.createSpaceProperty({
      spaceId: Number(space.id),
      key: `cfjs.num.${runId()}`,
      value: numberValue,
    });
    tracker.defer(async () => {
      await client.spaceProperties
        .deleteSpacePropertyById({ spaceId: Number(space.id), propertyId: Number(property.id) })
        .catch(() => undefined);
    });

    expect(property.value).toBe(numberValue);

    const fetched = await client.spaceProperties.getSpacePropertyById({
      spaceId: Number(space.id),
      propertyId: Number(property.id),
    });
    expect(fetched.value).toBe(numberValue);
  });
});
