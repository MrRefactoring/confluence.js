import { BlogPostBodyWrite } from './blogPostBodyWrite';

/** Body of the blog post. Only one body format should be specified as the property* for this object, e.g. `storage`. */
export interface BlogPostNestedBodyWrite {
  storage?: BlogPostBodyWrite;
  atlasDocFormat?: BlogPostBodyWrite;
  wiki?: BlogPostBodyWrite;
}
