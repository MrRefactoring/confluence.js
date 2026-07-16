import type { User } from './user.js';

export interface RelationData {
  createdBy?: User;
  createdDate?: string;
  friendlyCreatedDate?: string;
}
