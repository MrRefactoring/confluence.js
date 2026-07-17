---
title: TypeScript
description: Настройка TypeScript для confluence.js — moduleResolution, импорт типов параметров и ответов, и откуда эти типы берутся.
---

# TypeScript

## tsconfig

Пакет только ESM и поставляет `.d.ts` рядом с каждым модулем. Подходит любой из современных режимов резолвинга:

```jsonc
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",  // или "bundler"
    "target": "es2022",
    "strict": true
  }
}
```

`"moduleResolution": "node"` (умолчание TS 4) **не** работает: он старше карты `exports` и не найдёт `confluence.js/v2`.

## Типы идут вместе с вызовами

Каждый параметр запроса и каждый ответ типизированы, и то и другое можно импортировать:

```ts
import type { Page, CreatePage } from 'confluence.js/v2';
import type { Relation } from 'confluence.js/v1';
import type { ClientConfig, Auth } from 'confluence.js';

function draft(spaceId: string, title: string): CreatePage {
  return { body: { spaceId, status: 'current', title } };
}

function summarise(page: Page): string {
  return `${page.title} (v${page.version?.number})`;
}
```

Типы параметров названы по операции (`CreatePage`, `GetPageById`), типы ответов — по сущности (`Page`, `Space`, `Relation`).

## Типы генерируются из спеки Atlassian

Они не написаны руками: `src/v1` и `src/v2` генерируются из опубликованных OpenAPI-документов Atlassian, поэтому следуют за API, а не за чьей-то памятью о нём.

Там, где спека расходится с реальностью — а это случается, — расхождение ловит интеграционный сьют, гоняющий каждый неймспейс против живого сайта Confluence Cloud, и чинится это в генераторе. Ответ, не совпавший со своим типом, поднимает `ZodError` на границе, см. [Обработку ошибок](./error-handling).

## `unknown` вместо `any`

Там, где спека не описывает форму, сгенерированный код говорит `unknown`, а не `any`. Это неудобно намеренно: `any` молча пропустил бы опечатку, `unknown` заставляет посмотреть, что пришло на самом деле.

## Идентификаторы между версиями

v2 типизирует id контента как `number`, v1 — как `string`. Один и тот же id, разные объявления: спеки расходятся, а сгенерированные типы следуют своей спеке, а не выдуманному компромиссу:

```ts
const page = await v2.page.getPageById({ id: 12345 });
const restrictions = await v1.contentRestrictions.getRestrictions({ id: String(page.id) });
```
