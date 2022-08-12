import * as sinon from 'sinon';
import { ServerClient } from '../../src';
import test from 'ava';

const config = {
    host: 'https://localhost',
  };

test('should create correct url', t => {
  const serverClient = new ServerClient(config);

  const stub = sinon.stub(serverClient, 'sendRequest');

  serverClient.audit.createAuditRecord({ remoteAddress: '' });

  const callArgument = stub.getCall(0).args[0];

  // @ts-ignore
  t.is(serverClient.instance.defaults.baseURL, 'https://localhost/');
  t.is(callArgument.url, '/rest/api/audit');
});

test('should send the correct headers when creating attachments', t => {
  const serverClient = new ServerClient(config);

  const buffer = Buffer.from('Testing attachment', 'utf-8');
  const stub = sinon.stub(serverClient, 'sendRequest');

  serverClient.content.createAttachments({
    id: '1234567',
    comment: 'testing',
    file: buffer,
  })

  const callArgument = stub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/content/1234567/child/attachment')
  t.deepEqual(callArgument.headers, {
    'Content-Type': 'multipart/form-data',
    'X-Atlassian-Token': 'nocheck',
  });
});

test('should send the correct headers when updating attachments', t => {
  const serverClient = new ServerClient(config);

  const buffer = Buffer.from('Testing attachment', 'utf-8');
  const stub = sinon.stub(serverClient, 'sendRequest');

  serverClient.content.updateAttachmentData({
    id: '1234567',
    attachmentId: '89101112',
    comment: 'testing',
    file: buffer,
  })

  const callArgument = stub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/content/1234567/child/attachment/89101112/data')
  t.deepEqual(callArgument.headers, {
    'Content-Type': 'multipart/form-data',
    'X-Atlassian-Token': 'nocheck',
  });
})
