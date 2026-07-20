---
title: Быстрый старт с confluence.js
description: Установка confluence.js, создание API-токена Atlassian и первый запрос к Confluence Cloud. Типобезопасно, только ESM, валидация Zod.
---

# Быстрый старт

`confluence.js` — клиент Confluence Cloud REST API для Node.js и браузеров. Покрывает **обе** версии API — v2 и v1 — из одного пакета, типизирует каждый запрос и ответ и проверяет каждый ответ в рантайме.

## Установка

```bash
pnpm add confluence.js
# или: npm install confluence.js
# или: yarn add confluence.js
```

Требуется **Node.js 22+**. Пакет только ESM — нужен `"type": "module"` либо сборщик.

## Получение API-токена

1. Откройте [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).
2. Создайте токен и скопируйте его — Atlassian показывает его один раз.
3. Токен работает в паре с email того же аккаунта Atlassian.

Держите и то и другое в переменных окружения. Не коммитьте.

## Первый запрос

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: {
    type: 'basic',
    email: process.env.CONFLUENCE_EMAIL!,
    apiToken: process.env.CONFLUENCE_API_TOKEN!,
  },
});

const spaces = await confluence.space.getSpaces({ limit: 5 });

for (const space of spaces.results ?? []) {
  console.log(`${space.key} — ${space.name}`);
}
```

Если вывелись ваши пространства — всё готово.

## `host` — это просто ваш сайт

`host` — голый URL сайта: без `/wiki`, без пути к API:

```ts
host: 'https://your-domain.atlassian.net'   // ✅
host: 'https://your-domain.atlassian.net/wiki/api/v2'  // ❌
```

Путь к API (`/wiki/api/v2` для v2, `/wiki/rest/api` для v1) принадлежит каждому запросу — именно поэтому **один host обслуживает обе версии**.

## Создание страницы

```ts
const page = await confluence.page.createPage({
  body: {
    spaceId: '123456',
    status: 'current',
    title: 'Обзор проекта',
    body: {
      representation: 'storage',
      value: '<p>Добро пожаловать в документацию проекта.</p>',
    },
  },
});

console.log(`Создано: ${page.title} (#${page.id})`);
```

## Что дальше

- [Выбор версии API](./choosing-a-version) — когда нужен v1, а когда хватает v2. Прочтите первым: эта страница экономит больше всего времени.
- [Аутентификация](./authentication) — basic-аутентификация, OAuth 2.0 и обновление токенов.
- [Обработка ошибок](./error-handling) — `ApiError` и что означает `ZodError`.
- [Рецепты](../recipes/pages) — страницы, пространства, вложения, поиск.
