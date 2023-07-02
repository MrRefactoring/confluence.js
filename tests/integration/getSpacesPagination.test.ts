import { config } from './config';
import { Space } from '../../src/version2/models';
import test from 'ava';
import { Version2Client } from '../../src';

const version2Client = new Version2Client(config);

let spaces: Space[];

test.serial('`getSpaces()` should works', async t => {
  const spacesPagination = await version2Client.space.getSpaces();

  spaces = spacesPagination.results;

  t.truthy(spacesPagination.results.length <= 25);
});

test.serial('`getSpaceById(id)` should works', async t => {
  const space = await version2Client.space.getSpaceById({
    id: spaces[0].id,
    descriptionFormat: 'plain',
  });

  t.is(space.id, spaces[0].id);
  t.is(space.description.plain.representation, 'plain');
});

test.serial('`getAll()` function should works', async t => {
  const batchedSpaces = await version2Client.space.getSpaces({ limit: 1 });

  const allSpaces = await batchedSpaces.getAll();

  t.truthy(allSpaces.length > 1);
});

test.serial('`next()` function should works', async t => {
  const firstSpaceBatch = await version2Client.space.getSpaces({ limit: 1, descriptionFormat: 'view' });
  const secondSpaceBatch = await firstSpaceBatch.next();

  t.is(firstSpaceBatch.results.length, 1);
  t.is(firstSpaceBatch.results[0].description.view.representation, 'view');

  t.is(secondSpaceBatch.results.length, 1);
  t.is(secondSpaceBatch.results[0].description.view.representation, 'view');
});

test.serial('`getAllSpaces()` function should works', async t => {
  const allSpaces = await version2Client.space.getAllSpaces({ limit: 1, descriptionFormat: 'plain' });

  t.truthy(allSpaces.length > 1);
});
