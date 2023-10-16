import type { Pagination } from '../version2/models';

/** This service is responsible for handling pagination. */
export class PaginationService {
  /**
   * This method builds a paginated result based on the given pagination object and a function to call for the next
   * page.
   */
  buildPaginatedResult<T>(
    pagination: Pagination<T>,
    callFn: (params: any) => Promise<Pagination<T>>,
  ): Pagination<T> {
    if (!pagination._links.next) {
      return this.buildEmptyPagination(pagination);
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

  /** This method retrieves all pages of results. */
  private async getAll<T>(
    actualResult: T[],
    params: Record<string, string>,
    callFn: (params: Record<string, string>) => Promise<Pagination<T>>,
  ): Promise<T[]> {
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
    return str.replace(/([-_][a-z])/gi, piece => {
      return piece.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  private buildEmptyPagination<T>(pagination: Pagination<T>): Pagination<T> {
    const emptyPagination: Pagination<T> = {
      results: pagination.results,
      parameters: pagination.parameters,
      _links: {},
      hasNext: false,
      next: () =>
        Promise.resolve({
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
}
