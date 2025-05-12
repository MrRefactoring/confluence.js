import { describe, it, expect } from 'vitest';
import type {
  Callback,
  Client,
  Config,
  RequestConfig } from '../../src';
import {
  BaseClient,
  ConfluenceClient
} from '../../src';

describe('Type definitions', () => {
  it('Callback should be defined', () => {
    const callback: Callback<string> = () => {};
    expect(!!callback).toBeTruthy();
  });

  it('RequestConfig should be defined', () => {
    const requestConfig: RequestConfig = {};
    expect(!!requestConfig).toBeTruthy();
  });

  it('Config should be defined', () => {
    const config: Config = {
      host: 'http://localhost',
    };

    expect(!!config).toBeTruthy();
    expect(config.host).toBe('http://localhost');
    expect(typeof config.host).toBe('string');
  });

  it('Client should be defined', async () => {
    const client: Client = {
      sendRequest(): Promise<undefined> {
        return Promise.resolve(undefined);
      },
    };

    expect(!!client).toBeTruthy();
    expect(!!client.sendRequest).toBeTruthy();
    expect(!!(await client.sendRequest({}))).toBeFalsy();
  });

  it('BaseClient should be defined', () => {
    const baseClient = new BaseClient({ host: 'http://localhost' });
    expect(!!baseClient).toBeTruthy();
  });

  it('ConfluenceClient should be defined', () => {
    const confluenceClient = new ConfluenceClient({ host: 'http://localhost' });
    expect(!!confluenceClient).toBeTruthy();
  });
});
