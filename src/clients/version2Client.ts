import { BaseClient } from './baseClient';
import {
  Attachment,
  BlogPost,
  Children,
  Comment,
  ContentProperties,
  CustomContent,
  Label,
  Page,
  Space,
  SpaceProperties,
  Task,
  Version,
} from '../version2';

export class Version2Client extends BaseClient {
  attachment = new Attachment(this);
  blogPost = new BlogPost(this);
  children = new Children(this);
  comment = new Comment(this);
  contentProperties = new ContentProperties(this);
  customContent = new CustomContent(this);
  label = new Label(this);
  page = new Page(this);
  space = new Space(this);
  spaceProperties = new SpaceProperties(this);
  task = new Task(this);
  version = new Version(this);
}
