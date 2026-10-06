import * as FormData from 'form-data';
import * as sinon from 'sinon';
import test, { ExecutionContext } from 'ava';
import { ConfluenceClient } from '../../../src';

const config = { host: '' };

const attachment = {
  file: Buffer.from('file content'),
  filename: 'file.txt',
  minorEdit: true,
  comment: 'изменения ✓',
};

const setup = () => {
  const client = new ConfluenceClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  const sentBody = () => (sendRequestStub.lastCall.args[0].data as FormData).getBuffer().toString('utf8');

  return { client, sentBody };
};

const assertPlainFields = (t: ExecutionContext, body: string) => {
  t.true(body.includes('Content-Disposition: form-data; name="minorEdit"\r\n\r\ntrue\r\n'));
  t.true(body.includes('Content-Disposition: form-data; name="comment"\r\n\r\nизменения ✓\r\n'));
  t.true(body.includes('Content-Disposition: form-data; name="file"; filename="file.txt"'));
  t.false(body.includes('filename="minorEdit"'));
  t.false(body.includes('filename="comment"'));
};

test('createAttachments sends minorEdit and comment as plain form fields', t => {
  const { client, sentBody } = setup();

  client.contentAttachments.createAttachments({ id: '1', attachments: attachment });

  assertPlainFields(t, sentBody());
});

test('createOrUpdateAttachments sends minorEdit and comment as plain form fields', t => {
  const { client, sentBody } = setup();

  client.contentAttachments.createOrUpdateAttachments({ id: '1', attachments: attachment });

  assertPlainFields(t, sentBody());
});

test('updateAttachmentData sends minorEdit and comment as plain form fields', t => {
  const { client, sentBody } = setup();

  client.contentAttachments.updateAttachmentData({ id: '1', attachmentId: '2', attachment });

  assertPlainFields(t, sentBody());
});

test('repeats the plain fields for every attachment', t => {
  const { client, sentBody } = setup();

  client.contentAttachments.createAttachments({
    id: '1',
    attachments: [attachment, { ...attachment, filename: 'second.txt' }],
  });

  const body = sentBody();

  t.is(body.match(/name="minorEdit"\r\n/g)?.length, 2);
  t.is(body.match(/name="comment"\r\n/g)?.length, 2);
  t.false(body.includes('filename="minorEdit"'));
  t.false(body.includes('filename="comment"'));
});
