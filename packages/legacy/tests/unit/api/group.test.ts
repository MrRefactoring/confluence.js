import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Group } from '../../../src/api/index.js';
import type { Client } from '../../../src/clients/index.js';

describe('Group', () => {
  let mockClient: Client;
  let group: Group;

  beforeEach(() => {
    mockClient = {
      sendRequest: vi.fn(),
    } as unknown as Client;
    group = new Group(mockClient);
  });

  describe('method availability', () => {
    it('should have getGroups method', () => {
      expect(group.getGroups).toBeDefined();
      expect(typeof group.getGroups).toBe('function');
    });

    it('should have createGroup method', () => {
      expect(group.createGroup).toBeDefined();
      expect(typeof group.createGroup).toBe('function');
    });

    it('should have getGroupByGroupId method', () => {
      expect(group.getGroupByGroupId).toBeDefined();
      expect(typeof group.getGroupByGroupId).toBe('function');
    });

    it('should have removeGroupById method', () => {
      expect(group.removeGroupById).toBeDefined();
      expect(typeof group.removeGroupById).toBe('function');
    });

    it('should have searchGroups method', () => {
      expect(group.searchGroups).toBeDefined();
      expect(typeof group.searchGroups).toBe('function');
    });

    it('should have addUserToGroupByGroupId method', () => {
      expect(group.addUserToGroupByGroupId).toBeDefined();
      expect(typeof group.addUserToGroupByGroupId).toBe('function');
    });

    it('should have removeMemberFromGroupByGroupId method', () => {
      expect(group.removeMemberFromGroupByGroupId).toBeDefined();
      expect(typeof group.removeMemberFromGroupByGroupId).toBe('function');
    });

    it('should have getGroupMembersByGroupId method', () => {
      expect(group.getGroupMembersByGroupId).toBeDefined();
      expect(typeof group.getGroupMembersByGroupId).toBe('function');
    });

    it('should have addUserToGroup method', () => {
      expect(group.addUserToGroup).toBeDefined();
      expect(typeof group.addUserToGroup).toBe('function');
    });

    it('should have removeMemberFromGroup method', () => {
      expect(group.removeMemberFromGroup).toBeDefined();
      expect(typeof group.removeMemberFromGroup).toBe('function');
    });
  });

  describe('method implementations', () => {
    it('getGroups should call client.sendRequest with correct config', async () => {
      const params = { start: 0, limit: 50, accessType: 'some-type' };
      await group.getGroups(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group',
          method: 'GET',
          params: {
            start: params.start,
            limit: params.limit,
            accessType: params.accessType,
          },
        }),
        undefined,
      );
    });

    it('createGroup should call client.sendRequest with correct config', async () => {
      const params = { name: 'test-group' };
      await group.createGroup(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group',
          method: 'POST',
          data: {
            name: params.name,
          },
        }),
        undefined,
      );
    });

    it('getGroupByGroupId should call client.sendRequest with correct config', async () => {
      const params = { id: '12345' };
      await group.getGroupByGroupId(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group/by-id',
          method: 'GET',
          params: {
            id: params.id,
          },
        }),
        undefined,
      );
    });

    it('removeGroupById should call client.sendRequest with correct config', async () => {
      const params = { id: '12345' };
      await group.removeGroupById(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group/by-id',
          method: 'DELETE',
          params: {
            id: params.id,
          },
        }),
        undefined,
      );
    });

    it('searchGroups should call client.sendRequest with correct config', async () => {
      const params = {
        query: 'test',
        start: 0,
        limit: 50,
        shouldReturnTotalSize: true,
      };
      await group.searchGroups(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group/picker',
          method: 'GET',
          params: {
            query: params.query,
            start: params.start,
            limit: params.limit,
            shouldReturnTotalSize: params.shouldReturnTotalSize,
          },
        }),
        undefined,
      );
    });

    it('addUserToGroupByGroupId should call client.sendRequest with correct config', async () => {
      const params = {
        groupId: '12345',
        accountId: '67890',
      };
      await group.addUserToGroupByGroupId(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group/userByGroupId',
          method: 'POST',
          params: {
            groupId: params.groupId,
          },
          data: {
            accountId: params.accountId,
          },
        }),
        undefined,
      );
    });

    it('removeMemberFromGroupByGroupId should call client.sendRequest with correct config', async () => {
      const params = {
        groupId: '12345',
        accountId: '67890',
      };
      await group.removeMemberFromGroupByGroupId(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group/userByGroupId',
          method: 'DELETE',
          params: {
            groupId: params.groupId,
            accountId: params.accountId,
          },
        }),
        undefined,
      );
    });

    it('getGroupMembersByGroupId should call client.sendRequest with correct config', async () => {
      const params = {
        groupId: '12345',
        start: 0,
        limit: 50,
        shouldReturnTotalSize: true,
      };
      await group.getGroupMembersByGroupId(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group/12345/membersByGroupId',
          method: 'GET',
          params: {
            start: params.start,
            limit: params.limit,
            shouldReturnTotalSize: params.shouldReturnTotalSize,
          },
        }),
        undefined,
      );
    });

    it('addUserToGroup should call client.sendRequest with correct config', async () => {
      const params = {
        name: 'test-group',
        accountId: '67890',
      };
      await group.addUserToGroup(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group/user',
          method: 'POST',
          params: {
            name: params.name,
          },
          data: {
            accountId: params.accountId,
          },
        }),
        undefined,
      );
    });

    it('removeMemberFromGroup should call client.sendRequest with correct config', async () => {
      const params = {
        name: 'test-group',
        accountId: '67890',
      };
      await group.removeMemberFromGroup(params);

      expect(mockClient.sendRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/group/user',
          method: 'DELETE',
          params: {
            name: params.name,
            accountId: params.accountId,
          },
        }),
        undefined,
      );
    });
  });
});
