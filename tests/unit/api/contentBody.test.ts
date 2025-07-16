import { describe, it, expect, vi } from 'vitest';
import { ContentBody } from '~/api/contentBody';

describe('asyncConvertContentBodyRequest', () => {
  const mockClient = {
    sendRequest: vi.fn().mockResolvedValue({ id: '123' }),
  };
  const client = new ContentBody(mockClient);

  it('should handle all parameters correctly in the request config', async () => {
    const testParams = {
      to: 'view',
      value: '<p>test content</p>',
      representation: 'storage',
      spaceKeyContext: 'TEST',
      contentIdContext: '12345',
      allowCache: true,
      embeddedContentRender: 'full',
      expand: 'body.view',
      additionalProperties: {
        customProp: 'value',
      },
    };

    await client.asyncConvertContentBodyRequest(testParams);

    expect(mockClient.sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/api/contentbody/convert/async/view',
        method: 'POST',
        params: {
          spaceKeyContext: 'TEST',
          contentIdContext: '12345',
          allowCache: true,
          embeddedContentRender: 'full',
          expand: 'body.view',
        },
        data: {
          value: '<p>test content</p>',
          representation: 'storage',
          customProp: 'value',
        },
      }),
      undefined,
    );
  });

  it('should handle callback when provided', async () => {
    const testParams = {
      to: 'view',
      value: '<p>test content</p>',
      representation: 'storage',
    };
    const mockCallback = vi.fn();

    await client.asyncConvertContentBodyRequest(testParams, mockCallback);

    expect(mockClient.sendRequest).toHaveBeenCalledWith(
      expect.any(Object),
      mockCallback,
    );
  });

  it('should return a promise with AsyncId when no callback provided', async () => {
    const testParams = {
      to: 'view',
      value: '<p>test content</p>',
      representation: 'storage',
    };

    const result = await client.asyncConvertContentBodyRequest(testParams);
    expect(result).toEqual({ id: '123' });
  });

  it('should handle minimal required parameters', async () => {
    const testParams = {
      to: 'view',
      value: '<p>test content</p>',
      representation: 'storage',
    };

    await client.asyncConvertContentBodyRequest(testParams);

    expect(mockClient.sendRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/api/contentbody/convert/async/view',
        method: 'POST',
        params: {},
        data: {
          value: '<p>test content</p>',
          representation: 'storage',
        },
      }),
      undefined,
    );
  });
});
