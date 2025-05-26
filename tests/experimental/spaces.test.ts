import { describe, it, expect } from 'vitest';
import { Client, ConfigSchema } from '~/experimental';
import * as process from 'node:process';

describe('Spaces', () => {
  const config = ConfigSchema.parse({
    host: process.env.HOST,
    authorization: {
      email: process.env.EMAIL,
      apiToken: process.env.API_TOKEN,
    },
  });

  const client = new Client(config);

  it.sequential('should create space', async () => {
    const space = await client.spaces.create({ name: 'Experimental Space' });

    console.log(space);

    expect(space).toBeDefined();
  });

  it.sequential('should get all spaces', async () => {
    const spaces = await client.spaces.getAll();

    console.log(spaces);

    expect(spaces).toBeDefined();
  });
});
