import test from 'ava';
import { Version2Client } from '../../../src';

const version2Client = new Version2Client({ host: '' });

test('`getAllSpaces` should be defined', t => {
  t.truthy(!!version2Client.space.getAllSpaces);
});
