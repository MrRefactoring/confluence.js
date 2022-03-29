import test from 'ava';
import {
  BaseClient,
  Callback,
  Client,
  Config,
  ConfluenceClient,
  RequestConfig,
} from '../../src';

test('Callback should be defined', (t) => {
  const callback: Callback<string> = () => {};

  t.truthy(!!callback);
});

test('RequestConfig should be defined', (t) => {
  const requestConfig: RequestConfig = {};

  t.truthy(!!requestConfig);
});

test('Config should be defined', (t) => {
  const config: Config = {
    host: '',
  };

  t.truthy(!!config);
  t.is(config.host, '');
  t.is(typeof config.host, 'string');
});

test('Client should be defined', async (t) => {
  const client: Client = {
    sendRequest(): Promise<undefined> {
      return Promise.resolve(undefined);
    },
  };

  t.truthy(!!client);
  t.truthy(!!client.sendRequest);
  t.falsy(!!(await client.sendRequest({})));
});

test('BaseClient should be defined', (t) => {
  const baseClient = new BaseClient({ host: '' });

  t.truthy(!!baseClient);
});

test('ConfluenceClient should be defined', (t) => {
  const confluenceClient = new ConfluenceClient({ host: '' });

  t.truthy(!!confluenceClient);
});
