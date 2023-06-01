<div align="center">
  <img alt="Confluence.js logo" src="https://svgshare.com/i/Vrj.svg"/>

<a href="https://www.npmjs.com/package/confluence.js"><img alt="NPM version" src="https://img.shields.io/npm/v/confluence.js.svg?maxAge=3600&style=flat-square" /></a>
<a href="https://www.npmjs.com/package/confluence.js"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/confluence.js.svg?maxAge=3600&style=flat-square" /></a>
<a href="https://github.com/MrRefactoring/confluence.js"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/confluence.js/ci.yaml?style=flat-square"></a>
<a href="https://github.com/mrrefactoring/confluence.js/blob/develop/LICENSE"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/confluence.js?color=green&style=flat-square"/></a>

<span>JavaScript / TypeScript library for Node.JS and browsers to easily interact with Atlassian Confluence API</span>
</div>

## About

confluence.js is a powerful [Node.JS](https://nodejs.org/) / Browser module that allows you to interact with the [Confluence API](https://developer.atlassian.com/cloud/confluence/rest/intro/) very easily.

Usability, consistency, and performance are key focuses of confluence.js, and it also has nearly 100% coverage of the Confluence API. It receives new Confluence features shortly after they arrive in the API.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
    - [Basic](#basic-authentication)
    - [OAuth 2.0](#oauth-20)
    - [JWT](#jwt)
    - [Personal access token](#personal-access-token)
  - [Your first request and using algorithm](#your-first-request-and-using-algorithm)
  - [`apiPrefix` config parameter](#apiprefix-config-parameter)
- [Decreasing Webpack bundle size](#decreasing-webpack-bundle-size)
- [Take a look at our other products](#take-a-look-at-our-other-products)
- [License](#license)

## Installation

**Node.js 10.0.0 or newer is required.**

Install with the npm:

```bash
npm install confluence.js
```

Install with the yarn:

```bash
yarn add confluence.js
```

## Usage

#### Authentication

There are several types of authentication to gain access to the Confluence API. Let's take a look at a few of them below

##### [Basic authentication](https://developer.atlassian.com/cloud/confluence/basic-auth-for-rest-apis/)

Basic authentication allows you to log in with credentials. You can use username and password, but this login method is not supported in the online version, and most standalone versions, so it's better to release API Token, read how to do it [here](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/), and use it together with email.

Username and password example:

```typescript
import { ConfluenceClient } from 'confluence.js';

const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD',
    },
  },
});
```

Email and API Token example:

```typescript
import { ConfluenceClient } from 'confluence.js';

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

##### [OAuth 2.0](https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/)

Only the authorization token is currently supported. To release it, you need to read the [documentation](https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/) and write your own code to get the token.

Example of usage

```typescript
import { ConfluenceClient } from 'confluence.js';

const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    oauth2: {
      accessToken: 'YOUR_ACCESS_TOKEN',
    },
  },
});
```

##### [JWT](https://developer.atlassian.com/cloud/confluence/understanding-jwt/)

```typescript
import { ConfluenceClient } from 'confluence.js';

const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    jwt: {
      issuer: 'ISSUER',
      secret: 'shhhh',
      expiryTimeSeconds: 180,
    },
  },
});
```

##### [Personal access token](https://confluence.atlassian.com/enterprise/using-personal-access-tokens-1026032365.html)

```typescript
import { ConfluenceClient } from 'confluence.js';

const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    personalAccessToken: 'secrectPAT',
  },
});
```

#### Your first request and using algorithm

```typescript
import { ConfluenceClient } from 'confluence.js'; // Or import ServerClient if using standalone (Server) API

const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'YOUR_EMAIL',
      apiToken: 'YOUR_API_TOKEN',
    },
  },
});

async function main() {
  const space = await client.space.createSpace({
    name: 'My new space',
    key: 'SPACENAME',
  });

  console.log(space);
}

main();

// Expected output:
// {
//   id: 558714,
//   key: 'SPACENAME',
//   name: 'My new space',
//   description: {
//     plain: {
//       value: '',
//       representation: 'plain',
//       embeddedContent: []
//     },
//     _expandable: {view: ''}
//   },
//   homepage: {
//     id: '555312',
//     type: 'page',
//     status: 'current',
//     title: 'My new space Home',
//     macroRenderedOutput: {},
//     extensions: {position: 581},
//     _expandable: {
//       container: '/rest/api/space/SPACENAME',
//       metadata: '',
//       restrictions: '/rest/api/content/555312/restriction/byOperation',
//       history: '/rest/api/content/555312/history',
//       body: '',
//       version: '',
//       descendants: '/rest/api/content/555312/descendant',
//       space: '/rest/api/space/SPACENAME',
//       childTypes: '',
//       operations: '',
//       schedulePublishDate: '',
//       children: '/rest/api/content/555312/child',
//       ancestors: ''
//     },
//     _links: {
//       self: 'https://xxx.atlassian.net/wiki/rest/api/content/555312',
//       tinyui: '/x/qIoI',
//       editui: '/pages/resumedraft.action?draftId=555312',
//       webui: '/spaces/SPACENAME/overview'
//     }
//   },
//   type: 'global',
//   permissions: [...],
//   status: 'current',
//   _expandable: {
//     settings: '/rest/api/space/SPACENAME/settings',
//     metadata: '',
//     operations: '',
//     lookAndFeel: '/rest/api/settings/lookandfeel?spaceKey=SPACENAME',
//     identifiers: '',
//     icon: '',
//     theme: '/rest/api/space/SPACENAME/theme',
//     history: ''
//   },
//   _links: {
//     context: '/wiki',
//     self: 'https://xxx.atlassian.net/wiki/rest/api/space/SPACENAME',
//     collection: '/rest/api/space',
//     webui: '/spaces/SPACENAME',
//     base: 'https://xxx.atlassian.net/wiki'
//   }
// }
```

The algorithm for using the library:

```typescript
client.<group>.<methodName>(parametersObject);
```

Available groups:

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

The name of the methods is the name of the endpoint in the group without spaces and in `camelCase`.

The parameters depend on the specific endpoint. For more information, [see here](https://mrrefactoring.github.io/confluence.js/).

#### `apiPrefix` config parameter

The `apiPrefix` parameter is used to specify the prefix for the API. For example, if you use the custom domain `https://mydomain.atlassian.net/api` for API.

Example of use:

```typescript
import { ConfluenceClient } from 'confluence.js';

const client = new ConfluenceClient({
  host: 'https://your-domain.atlassian.net',
  apiPrefix: '/api',
});
```

## Decreasing Webpack bundle size

If you use Webpack and need to reduce the size of the assembly, you can create your client with only the groups you use.

```typescript
import { BaseClient } from 'confluence.js';
import { Api } from 'confluence.js';

export class CustomConfluenceClient extends BaseClient {
  content = new Api.Content(this);
  space = new Api.Space(this);
}
```

## Take a look at our other products

* [Jira.js](https://github.com/MrRefactoring/jira.js) - A JavaScript / TypeScript wrapper for the JIRA REST API
* [Trello.js](https://github.com/MrRefactoring/trello.js) - JavaScript / TypeScript library for Node.JS and browsers to easily interact with Atlassian Trello API

## License

Distributed under the MIT License. See `LICENSE` for more information.
