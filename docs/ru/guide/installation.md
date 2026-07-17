---
title: Установка
description: Установка confluence.js — требования, особенности ESM-only, точки входа и зависимости.
---

# Установка

```bash
pnpm add confluence.js
# или: npm install confluence.js
# или: yarn add confluence.js
```

## Требования

| | |
|---|---|
| Node.js | **22 или новее** — клиент использует встроенный `fetch` |
| Модули | **только ESM** — `"type": "module"` либо сборщик |
| TypeScript | 5.0+ с `"moduleResolution": "bundler"` или `"node16"` |

Браузер тоже работает: транспорт — `fetch`, и на пути запроса нет кода, специфичного для Node. Учтите, что Confluence Cloud не отдаёт CORS-заголовки для браузерных origin, поэтому браузерному приложению нужен прокси.

## Одна зависимость

Из рантайм-зависимостей — только **Zod**. axios, form-data, oauth и atlassian-jwt ушли вместе с 2.x: транспорт — нативный `fetch`, ответы валидирует Zod.

## Точки входа

```ts
import { createV1Client, createV2Client, ApiError } from 'confluence.js';
import { createClient } from 'confluence.js/core';
import { getGroups } from 'confluence.js/v1';
import { getPages } from 'confluence.js/v2';
```

| Точка входа | Что внутри |
|---|---|
| `confluence.js` | `createV1Client`, `createV2Client`, `ApiError`, типы конфигурации |
| `confluence.js/core` | транспорт: `createClient`, OAuth-хелперы, retry, `ApiError` |
| `confluence.js/v1` | каждый вызов v1 как отдельная функция плюс типы параметров и ответов |
| `confluence.js/v2` | то же для v2 |

Корень **не** реэкспортирует `confluence.js/v1` и `confluence.js/v2`: версии конфликтуют по именам вроде `createSpace` и `getTasks`. Импортируйте их из собственных точек входа — заодно это то, что уменьшает бандл, см. [Tree-Shaking](./tree-shaking).

## Только ESM

CommonJS-сборки нет. Из CJS используйте динамический импорт:

```js
const { createV2Client } = await import('confluence.js');
```

Если сборщик или тайпчекер жалуется на резолвинг — рабочие настройки описаны в разделе [TypeScript](./typescript).
