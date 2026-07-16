import type { CopyPageRequest } from '../models/index.js';

export interface CopyPage {
  id: string;
  destinationPageId: string;
  expand: string[];

  bodyParameters: CopyPageRequest;
}
