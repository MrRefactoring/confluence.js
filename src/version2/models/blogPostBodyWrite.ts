export interface BlogPostBodyWrite {
  /** Type of content representation used for the value field. */
  representation?: string;
  /** Body of the blog post, in the format found in the representation field. */
  value?: string;
}
