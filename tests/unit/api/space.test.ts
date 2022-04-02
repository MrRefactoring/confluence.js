import * as sinon from 'sinon';
import { ConfluenceClient } from '../../../src';
import test from 'ava';

const config = { host: '' };

test('when spaceKey is not provided', (t) => {
  const client = new ConfluenceClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.space.getSpaces({});

  const callArgument = sendRequestStub.lastCall.args[0];

  t.is(callArgument.params.spaceKey, undefined);
});

test('when spaceKey is empty array', (t) => {
  const client = new ConfluenceClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.space.getSpaces({ spaceKey: [] });

  const callArgument = sendRequestStub.lastCall.args[0];

  t.is(callArgument.params.spaceKey, '');
});

test('when spaceKey has one key', (t) => {
  const client = new ConfluenceClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.space.getSpaces({ spaceKey: ['KEY1'] });

  const callArgument = sendRequestStub.lastCall.args[0];

  t.is(callArgument.params.spaceKey(), 'spaceKey=KEY1');
});

test('when spaceKey has multiple keys', (t) => {
  const client = new ConfluenceClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.space.getSpaces({ spaceKey: ['KEY1', 'KEY2'] });

  const callArgument = sendRequestStub.lastCall.args[0];

  t.is(callArgument.params.spaceKey(), 'spaceKey=KEY1&spaceKey=KEY2');
});
