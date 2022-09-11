import { ConfluenceClient } from '../../../src';
import test from 'ava';

test('Confluence Client properties should be defined', t => {
  const client = new ConfluenceClient({ host: '' });

  t.truthy(!!client.contentContentState);
  t.truthy(!!client.contentStates);
});
