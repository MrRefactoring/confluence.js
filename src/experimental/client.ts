import { ApiService } from '~/experimental/services';
import type { Config } from '~/experimental/schemas/config';
import { Spaces } from '~/experimental/api';

export class Client {
  spaces: Spaces;

  private readonly api: ApiService;

  constructor(config: Config) {
    this.api = new ApiService(config);

    this.spaces = new Spaces(this.api);
  }
}
