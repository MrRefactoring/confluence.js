---
title: Tree-Shaking
description: Как уменьшить бандл с confluence.js — импортируйте плоские функции вместо объекта-клиента и платите только за те эндпоинты, которые вызываете.
---

# Tree-Shaking

Вызвать API можно двумя способами, и они по-разному влияют на размер бандла.

## Объект-клиент

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({ host, auth });

await confluence.page.getPages({ spaceId: ['123456'] });
```

Удобно, всё под рукой — и тянет за собой **все 30 неймспейсов v2**: фабрика ссылается на каждый, поэтому сборщик не может выкинуть ни один. Для сервера — идеально. Для браузерного бандла — расточительно.

## Плоские функции

Каждый эндпоинт есть и как отдельная функция, принимающая клиента первым аргументом:

```ts
import { createClient } from 'confluence.js/core';
import { getPages, createPage } from 'confluence.js/v2';

const client = createClient({ host, auth });

await getPages(client, { spaceId: ['123456'] });
await createPage(client, { body: { spaceId: '123456', status: 'current', title: 'Заметки' } });
```

Всё, что вы не импортировали, недостижимо — значит, и не попадёт в бандл. Два вызова стоят двух вызовов.

## Один клиент, обе версии

`createClient` не привязан к версии: путь к API живёт в каждом запросном URL, поэтому один и тот же клиент обслуживает и v1, и v2:

```ts
import { createClient } from 'confluence.js/core';
import { getPages } from 'confluence.js/v2';
import { searchByCQL } from 'confluence.js/v1';

const client = createClient({ host, auth });

await getPages(client, {});                       // → /wiki/api/v2/pages
await searchByCQL(client, { cql: 'type=page' });  // → /wiki/rest/api/search
```

## Конфликты имён

`confluence.js/v1` и `confluence.js/v2` оба экспортируют `createSpace`, `getTasks` и ещё несколько — именно поэтому корень не реэкспортирует ни один из них. Импортируйте из точки входа нужной версии, а когда нужны обе — используйте алиасы:

```ts
import { createSpace as createSpaceV1 } from 'confluence.js/v1';
import { createSpace as createSpaceV2 } from 'confluence.js/v2';
```

## Что выкинуть не получится

Zod. Каждый ответ валидируется, поэтому схемы по построению лежат на пути запроса — это цена уверенности, что данные соответствуют типу. Но схемы поэндпоинтные: вы несёте только те, которые импортировали.
