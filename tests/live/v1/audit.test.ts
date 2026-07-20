import { describe, it, expect, beforeAll } from 'vitest';
import { ApiError } from '#/core';
import type { V1Client } from '#/v1';
import { getV1Client } from '../setup/client';
import { runId } from '../helpers/naming';

/**
 * Audit records are v1-only, admin-gated, and site-wide.
 *
 * Two things here are deliberately careful. The audit log is append-only — a
 * record this suite creates cannot be deleted, so the write test marks its record
 * with the run id and leaves it to expire with the site's retention period. And
 * the retention period is site configuration: the round-trip writes back the
 * value it just read, so a run cannot change it even if it fails midway.
 *
 * Every test tolerates a typed refusal: the token may not be a site admin.
 */

let client: V1Client;

beforeAll(() => {
  client = getV1Client();
});

describe('Confluence Cloud v1 — audit.getAuditRecords (live, admin-gated)', () => {
  it('returns a typed page of audit records, or a typed ApiError without admin rights', async () => {
    try {
      const records = await client.audit.getAuditRecords();

      expect(Array.isArray(records.results)).toBe(true);

      for (const record of records.results) {
        expect(typeof record.creationDate).toBe('number');
      }
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  it('honors `limit`, or refuses in a typed way', async () => {
    try {
      const records = await client.audit.getAuditRecords({ limit: 1 });

      expect(records.results.length).toBeLessThanOrEqual(1);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  it('honors a date window, or refuses in a typed way', async () => {
    const startDate = String(Date.now() - 24 * 60 * 60 * 1000);

    try {
      const records = await client.audit.getAuditRecords({ startDate, limit: 5 });

      expect(Array.isArray(records.results)).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});

describe('Confluence Cloud v1 — audit.getAuditRecordsForTimePeriod (live, admin-gated)', () => {
  it('returns records for a relative window, or refuses in a typed way', async () => {
    try {
      const records = await client.audit.getAuditRecordsForTimePeriod({ number: 1, units: 'DAYS', limit: 5 });

      expect(Array.isArray(records.results)).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});

describe('Confluence Cloud v1 — audit.createAuditRecord (live, admin-gated, append-only)', () => {
  // The audit log cannot be pruned through the API, so this leaves one marked
  // record behind on purpose. It carries the run id, and expires with the site's
  // retention period.
  it('creates a marked audit record, or refuses in a typed way', async () => {
    try {
      const record = await client.audit.createAuditRecord({
        remoteAddress: '127.0.0.1',
        summary: `[cfjs:${runId()}] live test audit record`,
        description: 'Created by the confluence.js live test suite; safe to ignore.',
        category: 'cfjs',
      });

      expect(record.summary).toContain('cfjs');
      expect(typeof record.creationDate).toBe('number');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  // There is deliberately no "rejects an invalid record" test here. The endpoint
  // is lenient — even an empty `remoteAddress`, which the spec marks required, is
  // accepted — so probing for a rejection only writes another undeletable record
  // to the site's audit log for nothing.
});

describe('Confluence Cloud v1 — audit retention period (live, admin-gated)', () => {
  it('reads the retention period, typed', async () => {
    try {
      const retention = await client.audit.getRetentionPeriod();

      expect(typeof retention.number).toBe('number');
      expect(typeof retention.units).toBe('string');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });

  // Writes back exactly what it read: this exercises the round-trip without ever
  // changing the site's configuration, even if the assertion below fails.
  it('round-trips the retention period without changing it', async () => {
    const current = await client.audit.getRetentionPeriod().catch((e: unknown) => e);

    if (current instanceof ApiError) return;

    const { number, units } = current as { number: number; units: 'DAYS' };
    const updated = await client.audit.setRetentionPeriod({ number, units }).catch((e: unknown) => e);

    if (updated instanceof ApiError) return;

    expect(updated).toMatchObject({ number, units });

    const readBack = await client.audit.getRetentionPeriod();

    expect(readBack).toMatchObject({ number, units });
  });
});

describe('Confluence Cloud v1 — audit.exportAuditRecords (live, admin-gated)', () => {
  it('exports the audit log, or refuses in a typed way', async () => {
    try {
      const exported = await client.audit.exportAuditRecords({ format: 'csv' });

      expect(exported).toBeDefined();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});
