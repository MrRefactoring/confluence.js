import {
  Callback,
  RequestConfig,
  Config,
  Client,
  BaseClient,
  ConfluenceClient,
} from '../../src';

describe('Facade', () => {
  it('Callback should be defined', () => {
    const callback: Callback<string> = () => {};

    expect(callback).toBeDefined();
  });

  it('RequestConfig should be defined', () => {
    const requestConfig: RequestConfig = {};

    expect(requestConfig).toBeDefined();
  });

  it('Config should be defined', () => {
    const config: Config = {
      host: '',
    };

    expect(config).toBeDefined();
    expect(config.host).toBeDefined();
    expect(typeof config.host).toBe('string');
  });

  it('Client should be defined', async () => {
    const client: Client = {
      sendRequest(): Promise<undefined> {
        return Promise.resolve(undefined);
      },
    };

    expect(client).toBeDefined();
    expect(client.sendRequest).toBeDefined();
    expect(await client.sendRequest({})).toBeUndefined();
  });

  it('BaseClient should be defined', () => {
    const baseClient = new BaseClient({ host: '' });

    expect(baseClient).toBeDefined();
  });

  it('ConfluenceClient should be defined', () => {
    const confluenceClient = new ConfluenceClient({ host: '' });

    expect(confluenceClient).toBeDefined();
  });
});
