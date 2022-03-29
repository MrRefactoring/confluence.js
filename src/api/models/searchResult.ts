import { Breadcrumb } from './breadcrumb';
import { ContainerSummary } from './containerSummary';
import { Content } from './content';

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
