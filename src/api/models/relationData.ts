import type { User } from './user';

export interface RelationData {
  createdBy?: User;
  createdDate?: string;
  friendlyCreatedDate?: string;
}
