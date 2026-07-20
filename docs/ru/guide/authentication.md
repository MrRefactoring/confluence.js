---
title: Аутентификация
description: Аутентификация confluence.js через API-токен Atlassian или OAuth 2.0 (3LO), включая автоматическое обновление токенов и определение cloud id.
---

# Аутентификация

Обе фабрики принимают один и тот же объект `auth`, и `createClient` из `confluence.js/core` — тоже.

## Basic (API-токен)

Самый быстрый путь и правильный выбор для скриптов и фоновых задач. Создайте токен в [настройках аккаунта Atlassian](https://id.atlassian.com/manage-profile/security/api-tokens) и передайте вместе с email того же аккаунта:

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
```

Клиент отправляет это заголовком HTTP Basic. Токен несёт **ваши** права: куда дотягиваетесь вы, туда дотянется и скрипт.

## OAuth 2.0 (3LO)

Нужен, когда вы действуете от имени других пользователей. Передайте клиенту учётные данные приложения и refresh-токен — остальное он сделает сам: обновит токен до истечения, один раз повторит запрос после `401` и найдёт нужный сайт.

```ts
const confluence = createV2Client({
  auth: {
    type: 'oauth2',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    refreshToken: await tokenStore.refreshToken(),
    onTokenRefresh: async ({ refreshToken, expiresAt }) => {
      await tokenStore.save({ refreshToken, expiresAt });
    },
  },
});
```

`host` здесь нет: токены 3LO не принимаются на домене вашего сайта и работают только через шлюз Atlassian, поэтому клиент собирает этот URL сам.

У 3LO достаточно подвижных частей — разные семейства scopes для v1 и v2, ротация refresh-токенов, обработка колбэка, — чтобы вынести его в [отдельное руководство](./oauth2). Прочитайте его, прежде чем это подключать.

## Bearer-токены с истечением

Вне 3LO — шлюз или прокси, выпускающий собственные токены, — передайте резолвер, он вызывается на **каждом запросе**:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
});
```

А если токен истёк прямо во время запроса, `getAuthOn401` пересоберёт аутентификацию и повторит его:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
  getAuthOn401: async () => ({ type: 'bearer', token: await refreshAccessToken() }),
});
```

Срабатывает только на `401` и только один раз за запрос — второй `401` это уже настоящий `ApiError`, а не цикл повторов.

## JWT (Atlassian Connect) не поддерживается

В 3.x JWT убран. Connect-приложения аутентифицируются как *приложение*: общий секрет и подписанный JWT на каждый запрос — модель, отличная от двух описанных выше, и она привязывает клиент к жизненному циклу Connect.

Если вы делаете Connect-приложение, оставайтесь на `confluence.js@2`. См. [руководство по миграции](../migration/v2-to-v3).

## Куда попадают учётные данные

Ваши учётные данные уходят в два места и никуда больше: в заголовок `Authorization` ваших собственных запросов и — при OAuth 2.0 — на собственные эндпоинты Atlassian `auth.atlassian.com` и `api.atlassian.com` для обновления токена и поиска сайта. Ни телеметрии, ни аналитики, ни сторонних хостов в пакете нет.
