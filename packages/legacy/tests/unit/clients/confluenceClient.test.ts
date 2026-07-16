import { beforeEach, describe, expect, it } from 'vitest';
import { ConfluenceClient } from '../../../src/clients/index.js';

describe('Confluence Client', () => {
  let instance: ConfluenceClient;

  beforeEach(() => {
    instance = new ConfluenceClient({ host: 'https://127.0.0.1' });
  });

  it('should have contentComments api group', () => {
    expect(instance).toHaveProperty('contentComments');
  });

  it('should have contentProperties api group', () => {
    expect(instance).toHaveProperty('contentProperties');
  });

  it('should have inlineTasks api group', () => {
    expect(instance).toHaveProperty('inlineTasks');
  });

  it('should have spaceProperties api group', () => {
    expect(instance).toHaveProperty('spaceProperties');
  });

  it('should have userProperties api group', () => {
    expect(instance).toHaveProperty('userProperties');
  });
});

