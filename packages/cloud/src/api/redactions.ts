import { RedactionResponseSchema, type RedactionResponse } from '#/models/redactionResponse';
import type { PostRedactPage } from '#/parameters/postRedactPage';
import type { PostRedactBlog } from '#/parameters/postRedactBlog';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Redacts sensitive content in a Confluence page by replacing specified text ranges with redaction markers. Each
 * redaction in the response includes a unique UUID for restoration (except code block redactions). The response
 * metadata items maintain the same order as the input redaction pointers, and completely overlapping redactions are
 * merged into a single redaction with one UUID.
 *
 * **Note**: This endpoint requires **Atlassian Guard Premium**.
 */
export async function postRedactPage(client: Client, parameters: PostRedactPage): Promise<RedactionResponse> {
  const config: SendRequestOptions<RedactionResponse> = {
    url: `/pages/${parameters.id}/redact`,
    method: 'POST',
    body: parameters.body,
    schema: RedactionResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Redacts sensitive content in a Confluence blog post by replacing specified text ranges with redaction markers. Each
 * redaction in the response includes a unique UUID for restoration (except code block redactions). The response
 * metadata items maintain the same order as the input redaction pointers, and completely overlapping redactions are
 * merged into a single redaction with one UUID.
 *
 * **Note**: This endpoint requires **Atlassian Guard Premium**.
 */
export async function postRedactBlog(client: Client, parameters: PostRedactBlog): Promise<RedactionResponse> {
  const config: SendRequestOptions<RedactionResponse> = {
    url: `/blogposts/${parameters.id}/redact`,
    method: 'POST',
    body: parameters.body,
    schema: RedactionResponseSchema,
  };

  return await client.sendRequest(config);
}
