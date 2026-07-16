import type { Breadcrumb } from './breadcrumb.js';
import type { ContainerSummary } from './containerSummary.js';
import type { Content } from './content.js';

export interface SearchResult {
  content: Content;
  title: string;
  excerpt: string;
  url: string;
  resultParentContainer: ContainerSummary;
  resultGlobalContainer: ContainerSummary;
  breadcrumbs: Breadcrumb[];
  entityType: string;
  iconCssClass: string;
  lastModified: string;
  friendlyLastModified: string;
}
