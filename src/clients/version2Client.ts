import { BaseClient } from './baseClient';
import { Config } from '../config';
import {
  Attachment,
  BlogPost,
  Children,
  Comment,
  Content,
  ContentProperties,
  CustomContent,
  Label,
  Page,
  Space,
  SpaceProperties,
  Task,
  User,
  Version,
} from '../version2';

export class Version2Client extends BaseClient {
  constructor(config: Config) {
    super({
      ...config,
      newErrorHandling: true,
      apiPrefix: config.apiPrefix ?? '/wiki/api/v2',
    });
  }

  attachment = new Attachment(this);
  blogPost = new BlogPost(this);
  children = new Children(this);
  comment = new Comment(this);
  content = new Content(this);
  contentProperties = new ContentProperties(this);
  customContent = new CustomContent(this);
  label = new Label(this);
  page = new Page(this);
  space = new Space(this);
  spaceProperties = new SpaceProperties(this);
  task = new Task(this);
  user = new User(this);
  version = new Version(this);
}
