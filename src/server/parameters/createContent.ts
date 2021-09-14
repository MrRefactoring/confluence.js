import { ContentCreate } from '../../api/models';

export interface CreateContent extends ContentCreate {
  status?: string;
  expand?: string;
}
