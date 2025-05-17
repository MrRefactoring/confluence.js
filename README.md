<div align="center">
  <img alt="Confluence.js logo" src="https://bad37fb3-cb50-4e0b-9035-a3e09e8afb3b.selstorage.ru/confluence.js%2Flogo.svg"/>

  <a href="https://www.npmjs.com/package/confluence.js"><img alt="NPM version" src="https://img.shields.io/npm/v/confluence.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/confluence.js"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/confluence.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/confluence.js"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/confluence.js/ci.yaml?style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/confluence.js/blob/develop/LICENSE"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/confluence.js?color=green&style=flat-square"/></a>

  <span>JavaScript/TypeScript library for Node.js and browsers to interact with Atlassian Confluence API</span>
</div>

## About

Confluence.js is a powerful Node.js and browser-compatible module that provides seamless interaction with:
- [Confluence Cloud REST API](https://developer.atlassian.com/cloud/confluence/rest/)

Designed for developer experience and performance, it offers full API coverage and stays updated with new Confluence features.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Quick Example](#quick-example)
- [Documentation](#documentation)
- [Usage](#usage)
  - [Authentication](#authentication)
    - [Basic Auth](#basic-authentication)
    - [OAuth 2.0](#oauth-20)
    - [JWT](#jwt)
  - [First Request](#first-request)
  - [API Structure](#api-structure)
  - [Custom API Prefix](#custom-api-prefix)
- [Tree Shaking](#tree-shaking)
- [Other Products](#other-products)
- [License](#license)

## Getting Started

### Installation

**Requires Node.js 20.0.0 or newer**

```bash
# npm
npm install confluence.js

# yarn
yarn add confluence.js

# pnpm
pnpm add confluence.js
```

### Quick Example

Create a Confluence space in 3 steps:

```typescript
import { ConfluenceClient } from 'confluence.js';

const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'your@email.com',
      apiToken: 'YOUR_API_TOKEN', // Create one: https://id.atlassian.com/manage-profile/security/api-tokens
    },
  },
});

async function createSpace() {
  const space = await client.space.createSpace({
    name: 'Project Galaxy',
    key: 'GALAXY',
  });
  console.log(`Space created: ${space.key}`);
}

createSpace();
```

## Documentation

Full API reference and guides available at:
[https://mrrefactoring.github.io/confluence.js/](https://mrrefactoring.github.io/confluence.js/)

## Usage

### Authentication

#### Basic Authentication

1. Create an API token: [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Configure the client:

```typescript
const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'YOUR@EMAIL.ORG',
      apiToken: 'YOUR_API_TOKEN',
    },
  },
});
```

#### OAuth 2.0

Implement OAuth 2.0 flow using Atlassian's [documentation](https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/):

```typescript
const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    oauth2: {
      accessToken: 'YOUR_ACCESS_TOKEN',
    },
  },
});
```

#### JWT

For server-to-server integration:

```typescript
const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    jwt: {
      issuer: 'your-client-id',
      secret: 'your-secret-key',
      expiryTimeSeconds: 180,
    },
  },
});
```

### First Request

Create a page in an existing space:

```typescript
const page = await client.content.createContent({
  title: 'Project Overview',
  type: 'page',
  space: { key: 'GALAXY' },
  body: {
    storage: {
      value: '<p>Welcome to our project documentation</p>',
      representation: 'storage',
    },
  },
});

console.log(`Page created: ${page.title}`);
```

### API Structure

Access endpoints using `client.<group>.<method>` pattern:

```typescript
// Get space details
const space = await client.space.getSpace({ spaceKey: 'GALAXY' });

// Search content
const results = await client.search.search({ cql: 'title~"Project"' });
```

<details>
  <summary>🔽 Available API Groups</summary>

- [analytics](https://developer.atlassian.com/cloud/confluence/rest/api-group-analytics/)
- [audit](https://developer.atlassian.com/cloud/confluence/rest/api-group-audit)
- [content](https://developer.atlassian.com/cloud/confluence/rest/api-group-content/)
- [contentAttachments](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---attachments/#api-group-content---attachments)
- [contentBody](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-body/#api-group-content-body)
- [contentChildrenAndDescendants](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---children-and-descendants/#api-group-content---children-and-descendants)
- [contentComments](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-comments/#api-group-content-comments)
- [contentLabels](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-labels/#api-group-content-labels)
- [contentMacroBody](https://developer.atlassian.com/cloud/confluence/rest/api-group-content---macro-body/#api-group-content---macro-body)
- [contentPermissions](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-permissions/#api-group-content-permissions)
- [contentProperties](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-properties/#api-group-content-properties)
- [contentRestrictions](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-restrictions/#api-group-content-restrictions)
- [contentStates](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-states/#api-group-content-states)
- [contentVersions](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-versions/#api-group-content-versions)
- [contentWatches](https://developer.atlassian.com/cloud/confluence/rest/api-group-content-watches/#api-group-content-watches)
- [dynamicModules](https://developer.atlassian.com/cloud/confluence/rest/api-group-dynamic-modules/#api-group-dynamic-modules)
- [experimental](https://developer.atlassian.com/cloud/confluence/rest/api-group-experimental/#api-group-experimental)
- [group](https://developer.atlassian.com/cloud/confluence/rest/api-group-group/#api-group-group)
- [inlineTasks](https://developer.atlassian.com/cloud/confluence/rest/api-group-inline-tasks/#api-group-inline-tasks)
- [labelInfo](https://developer.atlassian.com/cloud/confluence/rest/api-group-label-info/#api-group-label-info)
- [longRunningTask](https://developer.atlassian.com/cloud/confluence/rest/api-group-long-running-task/#api-group-long-running-task)
- [relation](https://developer.atlassian.com/cloud/confluence/rest/api-group-relation/#api-group-relation)
- [search](https://developer.atlassian.com/cloud/confluence/rest/api-group-search/#api-group-search)
- [settings](https://developer.atlassian.com/cloud/confluence/rest/api-group-settings/#api-group-settings)
- [space](https://developer.atlassian.com/cloud/confluence/rest/api-group-space/#api-group-space)
- [spacePermissions](https://developer.atlassian.com/cloud/confluence/rest/api-group-space-permissions/#api-group-space-permissions)
- [spaceProperties](https://developer.atlassian.com/cloud/confluence/rest/api-group-space-properties/#api-group-space-properties)
- [spaceSettings](https://developer.atlassian.com/cloud/confluence/rest/api-group-space-settings/#api-group-space-settings)
- [template](https://developer.atlassian.com/cloud/confluence/rest/api-group-template/#api-group-template)
- [themes](https://developer.atlassian.com/cloud/confluence/rest/api-group-themes/#api-group-themes)
- [users](https://developer.atlassian.com/cloud/confluence/rest/api-group-users/#api-group-users)

</details>

### Custom API Prefix

For custom API endpoints:

```typescript
const client = new ConfluenceClient({
  host: 'https://custom-domain.com',
  apiPrefix: '/confluence-api', // Default: '/wiki/rest/api'
});
```

## Tree Shaking

Optimize bundle size by importing only needed modules:

```typescript
// custom-client.ts
import { BaseClient } from 'confluence.js';
import { Content } from 'confluence.js/api/content';
import { Space } from 'confluence.js/api/space';

export class CustomClient extends BaseClient {
  content = new Content(this);
  space = new Space(this);
}

// Usage
const client = new CustomClient({ /* config */ });
await client.space.getSpace({ spaceKey: 'GALAXY' });
```

## Other Products

Explore our other Atlassian integration libraries:
- [Jira.js](https://github.com/MrRefactoring/jira.js) - Jira API wrapper
- [Trello.js](https://github.com/MrRefactoring/trello.js) - Trello API integration

## License

MIT License © MrRefactoring
See [LICENSE](https://github.com/mrrefactoring/confluence.js/blob/develop/LICENSE) for details.
