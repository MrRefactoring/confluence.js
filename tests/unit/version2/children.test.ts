import test from 'ava';
import { Version2Client } from '../../../src';

const version2Client = new Version2Client({ host: '' });

test('`getAllChildPages` should be defined', t => {
  t.truthy(!!version2Client.children.getAllChildPages);
});

test('`getAllChildCustomContent` should be defined', t => {
  t.truthy(!!version2Client.children.getAllChildCustomContent);
});
