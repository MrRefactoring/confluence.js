import { ContentBodyCreate } from './contentBodyCreate';
import { Label } from './label';

/**
 * This object is used to update content templates.
 */
export interface ContentTemplateUpdate {
  /** The ID of the template being updated. */
  templateId: string;
  /** The name of the template. Set to the current `name` if this field is
    not being updated. */
  name: string;
  /** The type of the template. Set to `page`. */
  templateType: string;
  body: ContentBodyCreate;
  /** A description of the template. */
  description?: string;
  /** Labels for the template. */
  labels?: Label[];
  /** The key for the space of the template. Required if the template is a
    space template. Set this to the current `space.key`. */
  space?: {
    key: string;
  };
}
