export interface ConvertContentBody {
  to: string;

  storage?: any;
  editor?: any;
  view?: any;
  exportView?: any;
  styledView?: any;

  [key: string]: any;
}
