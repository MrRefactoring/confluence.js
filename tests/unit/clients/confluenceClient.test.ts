import test from 'ava';
import { ConfluenceClient } from '../../../src';

test('Confluence Client properties should be defined', t => {
  const client = new ConfluenceClient({ host: '' });

  t.truthy(!!client.contentContentState);
  t.truthy(!!client.contentStates);
});
