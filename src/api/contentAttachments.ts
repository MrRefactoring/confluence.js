import * as FormData from 'form-data';
import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ContentAttachments {
  constructor(private client: Client) {}

  /**
   * Returns the attachments for a piece of content.
   *
   * By default, the following objects are expanded: `metadata`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content. If the
   * content is a blog post, 'View' permission for the space is required.
   */
  async getAttachments<T = Models.ContentArray<Models.Attachment>>(
    parameters: Parameters.GetAttachments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the attachments for a piece of content.
   *
   * By default, the following objects are expanded: `metadata`.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content. If the
   * content is a blog post, 'View' permission for the space is required.
   */
  async getAttachments<T = Models.ContentArray<Models.Attachment>>(
    parameters: Parameters.GetAttachments,
    callback?: never,
  ): Promise<T>;
  async getAttachments<T = Models.ContentArray<Models.Attachment>>(
    parameters: Parameters.GetAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child/attachment`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
        filename: parameters.filename,
        mediaType: parameters.mediaType,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds an attachment to a piece of content. This method only adds a new attachment. If you want to update an existing
   * attachment, use [Create or update
   * attachments](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---attachments/#api-wiki-rest-api-content-id-child-attachment-put).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async createAttachments<T = Models.ContentArray<Models.CreatedAttachment>>(
    parameters: Parameters.CreateAttachments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds an attachment to a piece of content. This method only adds a new attachment. If you want to update an existing
   * attachment, use [Create or update
   * attachments](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---attachments/#api-wiki-rest-api-content-id-child-attachment-put).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async createAttachments<T = Models.ContentArray<Models.CreatedAttachment>>(
    parameters: Parameters.CreateAttachments,
    callback?: never,
  ): Promise<T>;
  async createAttachments<T = Models.ContentArray<Models.CreatedAttachment>>(
    parameters: Parameters.CreateAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const formData = new FormData();
    const attachments = Array.isArray(parameters.attachments) ? parameters.attachments : [parameters.attachments];

    attachments.forEach(attachment => {
      formData.append('minorEdit', attachment.minorEdit.toString(), 'minorEdit');
      formData.append('file', attachment.file, {
        filename: attachment.filename,
        contentType: attachment.contentType,
      });

      if (attachment.comment) {
        formData.append('comment', attachment.comment, 'comment');
      }
    });

    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child/attachment`,
      method: 'POST',
      headers: {
        'X-Atlassian-Token': 'no-check',
        'Content-Type': 'multipart/form-data',
        ...formData.getHeaders?.(),
      },
      params: {
        status: parameters.status,
      },
      data: formData,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds an attachment to a piece of content. If the attachment already exists for the content, then the attachment is
   * updated (i.e. a new version of the attachment is created).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async createOrUpdateAttachments<T = Models.ContentArray<Models.CreatedAttachment>>(
    parameters: Parameters.CreateOrUpdateAttachments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds an attachment to a piece of content. If the attachment already exists for the content, then the attachment is
   * updated (i.e. a new version of the attachment is created).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async createOrUpdateAttachments<T = Models.ContentArray<Models.CreatedAttachment>>(
    parameters: Parameters.CreateOrUpdateAttachments,
    callback?: never,
  ): Promise<T>;
  async createOrUpdateAttachments<T = Models.ContentArray<Models.CreatedAttachment>>(
    parameters: Parameters.CreateOrUpdateAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const formData = new FormData();
    const attachments = Array.isArray(parameters.attachments) ? parameters.attachments : [parameters.attachments];

    attachments.forEach(attachment => {
      formData.append('minorEdit', attachment.minorEdit.toString(), 'minorEdit');
      formData.append('file', attachment.file, {
        filename: attachment.filename,
        contentType: attachment.contentType,
      });

      if (attachment.comment) {
        formData.append('comment', attachment.comment, 'comment');
      }
    });

    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child/attachment`,
      method: 'PUT',
      headers: {
        'X-Atlassian-Token': 'no-check',
        'Content-Type': 'multipart/form-data',
        ...formData.getHeaders?.(),
      },
      params: {
        status: parameters.status,
      },
      data: formData,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the attachment properties, i.e. the non-binary data of an attachment like the filename, media-type,
   * comment, and parent container.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async updateAttachmentProperties<T = Models.CreatedAttachment>(
    parameters: Parameters.UpdateAttachmentProperties,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the attachment properties, i.e. the non-binary data of an attachment like the filename, media-type,
   * comment, and parent container.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async updateAttachmentProperties<T = Models.CreatedAttachment>(
    parameters: Parameters.UpdateAttachmentProperties,
    callback?: never,
  ): Promise<T>;
  async updateAttachmentProperties<T = Models.CreatedAttachment>(
    parameters: Parameters.UpdateAttachmentProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child/attachment/${parameters.attachmentId}`,
      method: 'PUT',
      data: parameters.update ?? parameters.body,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the binary data of an attachment, given the attachment ID, and optionally the comment and the minor edit
   * field.
   *
   * This method is essentially the same as [Create or update
   * attachments](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---attachments/#api-wiki-rest-api-content-id-child-attachment-put),
   * except that it matches the attachment ID rather than the name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async updateAttachmentData<T = Models.CreatedAttachment>(
    parameters: Parameters.UpdateAttachmentData,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the binary data of an attachment, given the attachment ID, and optionally the comment and the minor edit
   * field.
   *
   * This method is essentially the same as [Create or update
   * attachments](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---attachments/#api-wiki-rest-api-content-id-child-attachment-put),
   * except that it matches the attachment ID rather than the name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to update the content.
   */
  async updateAttachmentData<T = Models.CreatedAttachment>(
    parameters: Parameters.UpdateAttachmentData,
    callback?: never,
  ): Promise<T>;
  async updateAttachmentData<T = Models.CreatedAttachment>(
    parameters: Parameters.UpdateAttachmentData,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const { attachment } = parameters;

    const formData = new FormData();

    formData.append('minorEdit', attachment.minorEdit.toString(), 'minorEdit');
    formData.append('file', attachment.file, {
      filename: attachment.filename,
      contentType: attachment.contentType,
    });

    if (attachment.comment) {
      formData.append('comment', attachment.comment, 'comment');
    }

    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child/attachment/${parameters.attachmentId}/data`,
      method: 'POST',
      headers: {
        'X-Atlassian-Token': 'no-check',
        'Content-Type': 'multipart/form-data',
        ...formData.getHeaders?.(),
      },
      data: formData,
    };

    return this.client.sendRequest(config, callback);
  }

  /** Redirects the client to a URL that serves an attachment's binary data. */
  async downloadAttachment<T = Buffer>(parameters: Parameters.DownloadAttachment, callback: Callback<T>): Promise<void>;
  /** Redirects the client to a URL that serves an attachment's binary data. */
  async downloadAttachment<T = Buffer>(parameters: Parameters.DownloadAttachment, callback?: never): Promise<T>;
  async downloadAttachment<T = Buffer>(
    parameters: Parameters.DownloadAttachment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/child/attachment/${parameters.attachmentId}/download`,
      method: 'GET',
      responseType: 'arraybuffer',
      params: {
        version: parameters.version,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
