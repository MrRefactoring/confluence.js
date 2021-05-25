import { ContentTemplateBodyCreate } from './contentTemplateBodyCreate';
import { Label } from './label';

/** This object is used to create content templates. */
export interface ContentTemplateCreate {
  /** The name of the new template. */
  name: string;
  /** The type of the new template. Set to `page`. */
  templateType: string;
  body: ContentTemplateBodyCreate;
  /** A description of the new template. */
  description?: string;
  /** Labels for the new template. */
  labels?: Label[];
  /**
   * The key for the space of the new template. Only applies to space templates. If the spaceKey is not specified, the
   * template will be created as a global template.
   */
  space?: {
    key: string;
  };
}
