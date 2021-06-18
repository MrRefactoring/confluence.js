import * as sinon from 'sinon';
import { ServerApiClient } from '../../src';

describe('ServerApiClient', () => {
  it('should create correct url', () => {
    const serverClient = new ServerApiClient({
      host: 'https://localhost',
    });

    const stub = sinon.stub(serverClient, 'sendRequest');

    serverClient.audit.createAuditRecord({ remoteAddress: '' });

    const callArgument = stub.getCall(0).args[0];

    // @ts-ignore
    expect(serverClient.instance.defaults.baseURL).toBe('https://localhost/');
    expect(callArgument.url).toBe('/rest/api/audit');
  });
});
