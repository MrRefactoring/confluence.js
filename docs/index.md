---
layout: home

hero:
  name: confluence.js
  text: Type-safe Confluence Cloud API client
  tagline: Both REST API versions from one package, validated by Zod, tree-shakable, ESM-only.
  image:
    src: /favicon.svg
    alt: confluence.js
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/
    - theme: alt
      text: GitHub
      link: https://github.com/MrRefactoring/confluence.js

features:
  - icon: 🔀
    title: v1 and v2, one client
    details: v2 for everything Atlassian is building on, v1 for what it does not cover yet. Both take the same host — the API path belongs to the request, not to your config.
  - icon: 🔒
    title: Type-safe end to end
    details: Every endpoint, parameter and response is typed against Atlassian's own OpenAPI specs, so the types track the API.
  - icon: ✅
    title: Runtime validation
    details: Responses are checked against Zod 4 schemas. When Atlassian drifts from its own spec you find out at the boundary, not three functions later.
  - icon: 🌳
    title: Tree-shakable
    details: Import the client, or import just the calls you make. Subpath entry points at confluence.js/v1, /v2 and /core.
  - icon: 📦
    title: One dependency
    details: Zod, and nothing else. Native fetch, ESM-only, Node.js 22+. No axios, no form-data, no polyfills.
  - icon: 🧪
    title: Proven against the real API
    details: 493 integration tests run against a live Confluence Cloud site — every namespace of both versions.
---
