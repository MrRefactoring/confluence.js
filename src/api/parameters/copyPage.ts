import { CopyPageRequest } from '../models';

export interface CopyPage {
  id: string;
  destinationPageId: string;
  expand: string[];

  bodyParameters: CopyPageRequest;
}
