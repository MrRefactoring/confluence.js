import { BaseClient } from './baseClient';
import type { Config } from '../config';
import {
  Analytics,
  Audit,
  Content,
  ContentAttachments,
  ContentBody,
  ContentChildrenAndDescendants,
  ContentComments,
  ContentLabels,
  ContentMacroBody,
  ContentPermissions,
  ContentProperties,
  ContentRestrictions,
  ContentStates,
  ContentVersions,
  ContentWatches,
  DynamicModules,
  Experimental,
  Group,
  InlineTasks,
  LabelInfo,
  LongRunningTask,
  Relation,
  Search,
  Settings,
  Space,
  SpacePermissions,
  SpaceProperties,
  SpaceSettings,
  Template,
  Themes,
  Users,
} from '../api';

export class ConfluenceClient extends BaseClient {
  constructor(config: Config) {
    super({
      ...config,
      apiPrefix: config.apiPrefix ?? '/wiki/rest',
    });
  }

  analytics = new Analytics(this);
  audit = new Audit(this);
  content = new Content(this);
  contentAttachments = new ContentAttachments(this);
  contentBody = new ContentBody(this);
  contentChildrenAndDescendants = new ContentChildrenAndDescendants(this);
  contentComments = new ContentComments(this);
  contentLabels = new ContentLabels(this);
  contentMacroBody = new ContentMacroBody(this);
  contentPermissions = new ContentPermissions(this);
  contentProperties = new ContentProperties(this);
  contentRestrictions = new ContentRestrictions(this);
  contentStates = new ContentStates(this);
  contentVersions = new ContentVersions(this);
  contentWatches = new ContentWatches(this);
  dynamicModules = new DynamicModules(this);
  experimental = new Experimental(this);
  group = new Group(this);
  inlineTasks = new InlineTasks(this);
  labelInfo = new LabelInfo(this);
  longRunningTask = new LongRunningTask(this);
  relation = new Relation(this);
  search = new Search(this);
  settings = new Settings(this);
  space = new Space(this);
  spacePermissions = new SpacePermissions(this);
  spaceProperties = new SpaceProperties(this);
  spaceSettings = new SpaceSettings(this);
  template = new Template(this);
  themes = new Themes(this);
  users = new Users(this);
}
