import * as sinon from 'sinon';
import { ConfluenceClient, Api } from '../../../src';

describe('Space', () => {
  const client = new ConfluenceClient({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let space = new Api.Space(client);

  afterEach(() => {
    sendRequestStub.reset();
    space = new Api.Space(client);
  });

  describe('getSpaces should generate correct URL', () => {
    it('when spaceKey is empty array', () => {
      space.getSpaces({ spaceKey: [] });

      const callArgument = sendRequestStub.lastCall.args[0];

      expect(callArgument.params.spaceKey).toEqual([]);
    });

    it('when spaceKey has one key', () => {
      space.getSpaces({ spaceKey: ['KEY1'] });

      const callArgument = sendRequestStub.lastCall.args[0];

      expect(callArgument.params.spaceKey).toEqual(['KEY1']);
    });

    it('when spaceKey has multiple keys', () => {
      space.getSpaces({ spaceKey: ['KEY1', 'KEY2'] });

      const callArgument = sendRequestStub.lastCall.args[0];

      expect(callArgument.params.spaceKey).toEqual(['KEY1', '&spaceKey=KEY2']);
    });
  });
});
