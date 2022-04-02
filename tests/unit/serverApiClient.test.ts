import * as sinon from 'sinon';
import { ServerClient } from '../../src';
import test from 'ava';

test('should create correct url', t => {
  const serverClient = new ServerClient({
    host: 'https://localhost',
  });

  const stub = sinon.stub(serverClient, 'sendRequest');

  serverClient.audit.createAuditRecord({ remoteAddress: '' });

  const callArgument = stub.getCall(0).args[0];

  // @ts-ignore
  t.is(serverClient.instance.defaults.baseURL, 'https://localhost/');
  t.is(callArgument.url, '/rest/api/audit');
});
