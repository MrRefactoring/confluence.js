import { BaseClient } from './baseClient';
import { Audit, Content, ContentBody, Group, LongTask, Search, Space, User } from '../server';

export class ServerClient extends BaseClient {
  urlSuffix = '/';

  audit = new Audit(this);
  content = new Content(this);
  contentBody = new ContentBody(this);
  group = new Group(this);
  longTask = new LongTask(this);
  search = new Search(this);
  space = new Space(this);
  user = new User(this);
}
