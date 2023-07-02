import test from 'ava';
import { Version2Client } from '../../../src';

const version2Client = new Version2Client({ host: '' });

test('`getAllBlogPostAttachments` should be defined', t => {
  t.truthy(!!version2Client.attachment.getAllBlogPostAttachments);
});

test('`getAllCustomContentAttachments` should be defined', t => {
  t.truthy(!!version2Client.attachment.getAllBlogPostAttachments);
});

test('`getAllLabelAttachments` should be defined', t => {
  t.truthy(!!version2Client.attachment.getAllLabelAttachments);
});

test('`getAllPageAttachments` should be defined', t => {
  t.truthy(!!version2Client.attachment.getAllPageAttachments);
});

