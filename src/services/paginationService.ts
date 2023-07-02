import type { Pagination } from '../version2/models';

export class PaginationService {
  buildPaginatedResult<T>(pagination: Pagination<T>, callFn: any): Pagination<T> {
    if (!pagination._links.next) {
      const emptyPagination: Pagination<T> = {
        results: pagination.results,
        parameters: pagination.parameters,
        _links: {},
        hasNext: false,
        next: () => Promise.resolve({
          results: [],
          hasNext: false,
          parameters: pagination.parameters,
          _links: pagination._links,
          next: emptyPagination.next,
          getAll: () => Promise.resolve([]),
        }),
        getAll: () => Promise.resolve(pagination.results),
      };

      return emptyPagination;
    }

    const parameters = this.parseParameters(pagination._links.next);

    return {
      results: pagination.results,
      _links: pagination._links,
      parameters,
      hasNext: true,
      next: () => callFn(parameters),
      getAll: () => this.getAll<T>(pagination.results, parameters, callFn),
    };
  }

  private parseParameters(urlString: string) {
    const url = new URL(urlString, 'http://temp.temp');

    const searchParams = new URLSearchParams(url.search);

    const paramsObject: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      paramsObject[this.toCamelCase(key)] = value;
    });

    return paramsObject;
  }

  private async getAll<T>(actualResult: any[], params: Record<string, string>, callFn: any): Promise<T[]> {
    let hasNext = true;

    while (hasNext) {
      const paginationResult: Pagination<T> = await callFn(params);

      actualResult.push(...paginationResult.results);

      if (paginationResult._links.next) {
        params = this.parseParameters(paginationResult._links.next);
      } else {
        hasNext = false;
      }
    }

    return actualResult;
  }

  private toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/ig, piece => {
      return piece.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  }
}
