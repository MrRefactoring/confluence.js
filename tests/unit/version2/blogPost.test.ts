import test from 'ava';
import { Version2Client } from '../../../src';

const version2Client = new Version2Client({ host: '' });

test('`getAllBlogPosts` should be defined', t => {
  t.truthy(!!version2Client.blogPost.getAllBlogPosts);
});

test('`getAllLabelBlogPosts` should be defined', t => {
  t.truthy(!!version2Client.blogPost.getAllLabelBlogPosts);
});

test('`getAllBlogPostsInSpace` should be defined', t => {
  t.truthy(!!version2Client.blogPost.getAllBlogPostsInSpace);
});
