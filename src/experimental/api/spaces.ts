import type { GetSpaceByIdOptions, GetAllSpacesOptions, CreateSpace } from '~/experimental/schemas/requests';
import type { ApiService } from '~/experimental/services';

export class Spaces {
  private baseUrl = '/spaces';

  constructor(private readonly api: ApiService) {}

  async create(space: CreateSpace) {
    return this.api.sendRequest({
      url: this.baseUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: space.name,
        key: space.key,
        alias: space.alias,
        description: space.description,
        roleAssignments: space.roleAssignments,
      },
    });
  }

  async getAll(options?: GetAllSpacesOptions) {
    return this.api.sendRequest({
      url: this.baseUrl,
      method: 'GET',
      query: {
        ids: options?.ids,
        keys: options?.keys,
        type: options?.type,
        status: options?.status,
        labels: options?.labels,
        'favorited-by': options?.favoritedBy,
        'not-favorited-by': options?.notFavoritedBy,
        sort: options?.sort,
        'description-format': options?.descriptionFormat,
        'include-icon': options?.includeIcon,
        cursor: options?.cursor,
        limit: options?.limit,
      },
    });
  }

  async getById(id: number, options?: GetSpaceByIdOptions) {
    return this.api.sendRequest({
      url: this.buildUrl(id),
      method: 'GET',
      query: {
        'description-format': options?.descriptionFormat,
        'include-icon': options?.include?.icon,
        'include-operations': options?.include?.operations,
        'include-properties': options?.include?.properties,
        'include-permissions': options?.include?.permissions,
        'include-role-assignments': options?.include?.roleAssignments,
        'include-labels': options?.include?.labels,
      }
    });
  }

  private buildUrl(...path: (string | number)[]) {
    return `${this.baseUrl}/${path.join('/')}`;
  }
}
