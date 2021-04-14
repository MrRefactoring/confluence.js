import { Content } from './content';
import { ContainerSummary } from './containerSummary';
import { Breadcrumb } from './breadcrumb';

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
