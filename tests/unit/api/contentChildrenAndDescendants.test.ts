import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContentChildrenAndDescendants } from '~/api/contentChildrenAndDescendants';
import type { RequestConfig } from '~/requestConfig';

describe('getContentChildren', () => {
  let client: ContentChildrenAndDescendants;
  const mockSendRequest = vi.fn();

  beforeEach(() => {
    // Create a fresh instance for each test
    mockSendRequest.mockReset();
    mockSendRequest.mockResolvedValue({});
    client = new ContentChildrenAndDescendants({
      sendRequest: mockSendRequest,
    });
  });

  it('should use all parameters in the request config', async () => {
    // Arrange
    const testParams = {
      id: '12345',
      expand: ['body.view', 'version'],
      parentVersion: 2,
      start: 10,
      limit: 25,
    };

    // Mock the successful response
    mockSendRequest.mockResolvedValue({
      page: [],
      comment: [],
      attachment: [],
    });

    // Act
    await client.getContentChildren(testParams);

    // Assert
    expect(mockSendRequest).toHaveBeenCalledTimes(1);

    const calledConfig: RequestConfig = mockSendRequest.mock.calls[0][0];

    // Verify URL construction with content ID
    expect(calledConfig.url).toBe(`/api/content/${testParams.id}/child`);
    expect(calledConfig.method).toBe('GET');

    // Verify all query parameters
    expect(calledConfig.params).toEqual({
      expand: testParams.expand,
      parentVersion: testParams.parentVersion,
      start: testParams.start,
      limit: testParams.limit,
    });
  });
});
