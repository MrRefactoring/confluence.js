import { Config } from '../../src';

const host = process.env.HOST!;
const email = process.env.EMAIL!;
const apiToken = process.env.API_TOKEN!;

export const config: Config = {
  host,
  authentication: {
    basic: {
      email,
      apiToken,
    },
  },
};
