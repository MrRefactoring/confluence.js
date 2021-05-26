export interface ContentBody {
  value: string;
  representation: string;
  embeddedContent?: EmbeddedContent[];
  webresource?: WebResourceDependencies;
  _expandable: {
    content?: string;
  };
}
