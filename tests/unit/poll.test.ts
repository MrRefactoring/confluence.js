import { describe, expect, it, vi } from 'vitest';
import { waitFor } from '../live/helpers/poll';

describe('waitFor timeout diagnostics', () => {
  it('includes the final task status and caller context when attempts run out', async () => {
    const task = { id: 'task-123', finished: false, percentageComplete: 0 };
    const readTask = vi
      .fn<() => Promise<typeof task>>()
      .mockResolvedValueOnce(task)
      .mockResolvedValueOnce({ ...task, percentageComplete: 25 });

    await expect(
      waitFor(readTask, task => task.finished, {
        maxAttempts: 2,
        initialDelayMs: 0,
        describeLastValue: task => JSON.stringify({ pageId: 'page-456', task }),
      }),
    ).rejects.toThrow(
      'waitFor: condition not satisfied after 2 attempts; last value: ' +
        '{"pageId":"page-456","task":{"id":"task-123","finished":false,"percentageComplete":25}}',
    );
  });

  it('returns a completed task without formatting timeout diagnostics', async () => {
    const task = { id: 'task-123', finished: true };
    const describeLastValue = vi.fn();

    await expect(
      waitFor(
        async () => task,
        value => value.finished,
        { describeLastValue },
      ),
    ).resolves.toBe(task);
    expect(describeLastValue).not.toHaveBeenCalled();
  });

  it('preserves the original request failure without formatting timeout diagnostics', async () => {
    const error = new Error('Request failed: 503 Service Unavailable');
    const describeLastValue = vi.fn();

    await expect(
      waitFor(
        async () => {
          throw error;
        },
        () => false,
        { describeLastValue },
      ),
    ).rejects.toBe(error);
    expect(describeLastValue).not.toHaveBeenCalled();
  });

  it('preserves the timeout message when no diagnostics are requested', async () => {
    await expect(
      waitFor(
        async () => false,
        value => value,
        { maxAttempts: 1 },
      ),
    ).rejects.toThrow(/^waitFor: condition not satisfied after 1 attempts$/);
  });
});
