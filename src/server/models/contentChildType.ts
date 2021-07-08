/**
 * Shows whether a piece of content has attachments, comments, or child pages.* Note, this doesn't actually contain the
 * child objects.
 */
export interface ContentChildType {
  attachment?: {
    value: boolean;
    _links: Record<string, any>;
  };
  comment?: {
    value: boolean;
    _links: Record<string, any>;
  };
  page?: {
    value: boolean;
    _links: Record<string, any>;
  };
  _expandable: {
    all?: string;
    attachment?: string;
    comment?: string;
    page?: string;
  };
}
