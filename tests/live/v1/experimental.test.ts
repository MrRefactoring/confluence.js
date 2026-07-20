import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestPage, createTestSpace } from '../setup/fixtures';
import { runId, testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * The `experimental` namespace is Atlassian's own label, and it means what it
 * says: these endpoints can change without notice. Space labels and page-tree
 * delete live here, and nowhere else in either API.
 *
 * Everything runs against a disposable fixture space.
 */

const tracker = new ResourceTracker();

let client: V1Client;
let spaceId: string;
let spaceKey: string;

beforeAll(async () => {
  client = getV1Client();

  const space = await createTestSpace(tracker, 'exp');

  spaceId = space.id;
  spaceKey = space.key;
}, 100_000);

afterAll(async () => {
  await tracker.cleanup();
}, 100_000);

describe('Confluence Cloud v1 — space labels (live, round-trip)', () => {
  const labelName = `cfjs-space-label-${runId()}`.toLowerCase();

  it('returns a typed page of labels for a space with none yet', async () => {
    const labels = await client.experimental.getLabelsForSpace({ spaceKey });

    expect(Array.isArray(labels.results)).toBe(true);
  });

  it('adds a label to the space and reads it back', async () => {
    await client.experimental.addLabelsToSpace({ spaceKey, body: [{ prefix: 'global', name: labelName }] });

    const labels = await client.experimental.getLabelsForSpace({ spaceKey });
    const names = labels.results.map(label => label.name);

    expect(names).toContain(labelName);
  });

  it('honors `prefix`', async () => {
    const labels = await client.experimental.getLabelsForSpace({ spaceKey, prefix: 'global' });

    expect(labels.results.map(label => label.name)).toContain(labelName);
  });

  it('honors `limit`', async () => {
    const labels = await client.experimental.getLabelsForSpace({ spaceKey, limit: 1 });

    expect(labels.results.length).toBeLessThanOrEqual(1);
  });

  it('deletes the label, and it disappears from the listing', async () => {
    await client.experimental.deleteLabelFromSpace({ spaceKey, name: labelName, prefix: 'global' });

    const labels = await client.experimental.getLabelsForSpace({ spaceKey });

    expect(labels.results.map(label => label.name)).not.toContain(labelName);
  });

  it('rejects an unknown space key with an ApiError', async () => {
    const error = await client.experimental.getLabelsForSpace({ spaceKey: 'CFJSNOSUCHSPACE' }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});

describe('Confluence Cloud v1 — experimental.deletePageTree (live, async task)', () => {
  it('starts an async page-tree delete and the task runs to completion', async () => {
    const root = await createTestPage(tracker, spaceId, { title: testName('tree-del-root') });
    const child = await createTestPage(tracker, spaceId, {
      title: testName('tree-del-child'),
      parentId: String(root.id),
    });

    expect(child.id).toBeTruthy();

    // Like the space delete, this is a task rather than an inline delete: the call
    // returns as soon as the work is queued.
    const started = await client.experimental.deletePageTree({ id: String(root.id) });

    expect(started.id).toBeTruthy();

    const task = await waitFor(
      () => client.longRunningTask.getTask({ id: started.id! }),
      value => value.finished === true || value.percentageComplete === 100,
      { maxAttempts: 8, initialDelayMs: 1000 },
    );

    expect(task.percentageComplete).toBe(100);
  }, 120_000);

  it('rejects an unknown page id with an ApiError', async () => {
    const error = await client.experimental.deletePageTree({ id: '0' }).catch(e => e);

    expect(error).toBeInstanceOf(ApiError);
  });
});
