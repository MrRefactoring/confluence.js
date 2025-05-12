import type { Breadcrumb } from './breadcrumb';
import type { ContainerSummary } from './containerSummary';
import type { Content } from './content';

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
