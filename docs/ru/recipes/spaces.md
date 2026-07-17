---
title: Пространства
description: Создание, чтение, обновление и удаление пространств Confluence через confluence.js — разделение v1/v2, свойства, права и роли.
---

# Пространства

Пространства — единственное место, где разделение версий по-настоящему неудобно: **v2 их читает, v1 их пишет.** Atlassian убрал `getSpace`/`getSpaces` из спеки v1 и не добавил create/update/delete в v2, поэтому жизненный цикл проходит через обе версии.

```ts
import { createV1Client, createV2Client } from 'confluence.js';

const host = 'https://your-domain.atlassian.net';
const v2 = createV2Client({ host, auth });
const v1 = createV1Client({ host, auth });
```

## Чтение — v2

```ts
const spaces = await v2.space.getSpaces({ limit: 25 });

for (const space of spaces.results ?? []) {
  console.log(`${space.key} — ${space.name}`);
}

const space = await v2.space.getSpaceById({ id: 123456 });
```

## Создание — v1

Обратите внимание на форму: v1 принимает поля плоско, без обёртки `body`.

```ts
const created = await v1.space.createSpace({
  key: 'DOCS',
  name: 'Документация',
  description: { plain: { value: 'Документация по продукту', representation: 'plain' } },
});

console.log(created.id, created.key);
```

Личное, приватное пространство:

```ts
await v1.space.createPrivateSpace({ key: 'MYNOTES', name: 'Мои заметки' });
```

## Обновление — v1

```ts
await v1.space.updateSpace({ spaceKey: 'DOCS', name: 'Документация по продукту' });
```

## Удаление — v1, и это задача

```ts
const task = await v1.space.deleteSpace({ spaceKey: 'DOCS' });
```

::: warning
Удаление пространства не происходит на месте. Вызов возвращает **долгую задачу**, как только работа поставлена в очередь: когда промис зарезолвился, пространство ещё на месте. Если нужно знать, когда оно действительно исчезло, опрашивайте `longRunningTask.getTask({ id: task.id })`.
:::

## Свойства пространства

Произвольный JSON, прикреплённый к пространству. Здесь v2 закрывает всё:

```ts
await v2.spaceProperties.createSpaceProperty({
  spaceId: 123456,
  body: { key: 'team.owner', value: { squad: 'platform', slack: '#platform' } },
});

const props = await v2.spaceProperties.getSpaceProperties({ spaceId: 123456 });
const one = await v2.spaceProperties.getSpacePropertyById({ spaceId: 123456, propertyId: 789 });
```

Значения возвращаются как есть — объекты, массивы, строки и числа приходят в той же форме, в какой вы их положили.

## Права

Чтение — v2:

```ts
const permissions = await v2.spacePermissions.getSpacePermissionsAssignments({ id: 123456, limit: 100 });
```

Запись — v1, **но только на сайте с классическими правами пространств**:

```ts
await v1.spacePermissions.addPermissionToSpace({
  spaceKey: 'DOCS',
  subject: { type: 'group', identifier: groupId },
  operation: { key: 'read', target: 'space' },
});
```

::: danger Сайты в roles-only режиме отвергают это целиком
Сайт в режиме **roles-only (RBAC)** отвечает на любую классическую запись прав ошибкой `400 InvalidRbacOperationException: Space permission updates that are not from RBAC are not supported in roles-only mode`. Это не проблема доступа, и никакого флага передать нельзя: такой сайт управляет доступом через **роли пространств в v2**:

```ts
const roles = await v2.spaceRoles.getSpaceRoles({ spaceId: 123456 });
const assignments = await v2.spaceRoles.getRoleAssignments({ id: 123456 });
```
:::

Ещё две вещи, на которых настаивает живой API, если вы всё же на сайте с классическими правами:

- `read space` — предусловие. Выдача любого другого права субъекту без него падает с 400 и прямо об этом сообщает.
- Создатель пространства уже имеет на нём все права. Повторная выдача — это `400 Permission already exists`, а не тихий no-op.

## Метки и настройки пространства

И то и другое — только v1:

```ts
await v1.experimental.addLabelsToSpace({ spaceKey: 'DOCS', body: [{ prefix: 'global', name: 'product' }] });
const labels = await v1.experimental.getLabelsForSpace({ spaceKey: 'DOCS' });

const settings = await v1.spaceSettings.getSpaceSettings({ spaceKey: 'DOCS' });
const theme = await v1.themes.getSpaceTheme({ spaceKey: 'DOCS' }); // 404, если у пространства тема сайта
```

`experimental` — это собственное название неймспейса у Atlassian: такие эндпоинты могут меняться без предупреждения.
