import test from 'ava';
import { Version2Client } from '../../../src';

const version2Client = new Version2Client({ host: '' });

test('`getAllPageFooterComments` should be defined', t => {
  t.truthy(!!version2Client.comment.getAllPageFooterComments);
});

test('`getAllPageInlineComments` should be defined', t => {
  t.truthy(!!version2Client.comment.getAllPageInlineComments);
});

test('`getAllBlogPostFooterComments` should be defined', t => {
  t.truthy(!!version2Client.comment.getAllBlogPostFooterComments);
});

test('`getAllBlogPostInlineComments` should be defined', t => {
  t.truthy(!!version2Client.comment.getAllBlogPostInlineComments);
});

test('`getAllFooterCommentChildren` should be defined', t => {
  t.truthy(!!version2Client.comment.getAllFooterCommentChildren);
});

test('`getAllInlineCommentChildren` should be defined', t => {
  t.truthy(!!version2Client.comment.getAllInlineCommentChildren);
});
