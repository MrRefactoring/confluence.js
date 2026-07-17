---
title: Аутентификация
description: Аутентификация confluence.js через API-токен Atlassian или OAuth 2.0 (3LO), включая обновление токенов и хук повторной авторизации после 401.
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

Клиент отправляет их HTTP-заголовком Basic. Токен несёт **ваши** права: куда дотягиваетесь вы, туда дотянется и скрипт.

## OAuth 2.0 (3LO)

Чтобы действовать от имени других пользователей, передайте access-токен как bearer:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', token: accessToken },
});
```

### Токены, которые истекают

Access-токен в переменной устаревает. Передайте вместо него резолвер — он вызывается на **каждый запрос**, поэтому всегда видит актуальный токен:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
});
```

А если токен истёк прямо в полёте, `getAuthOn401` один раз переполучит авторизацию и повторит запрос:

```ts
const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'bearer', getToken: () => tokenStore.current() },
  getAuthOn401: async () => ({ type: 'bearer', token: await refreshAccessToken() }),
});
```

Срабатывает только на `401` и только один раз на запрос — второй `401` это уже настоящий `ApiError`, а не бесконечный цикл.

## Сам поток 3LO

`confluence.js/core` закрывает и процесс авторизации, так что отдельная OAuth-библиотека не нужна:

```ts
import {
  buildAtlassianAuthUrl,
  parseAtlassianCallbackUrl,
  obtainAtlassianOAuthTokens,
  refreshAtlassianOAuthTokens,
} from 'confluence.js/core';

// 1. Отправляем пользователя сюда.
const url = buildAtlassianAuthUrl({
  clientId: process.env.OAUTH_CLIENT_ID!,
  redirectUri: 'https://your-app.example/callback',
  scope: ['read:page:confluence', 'write:page:confluence', 'offline_access'],
  state: sessionState,
});

// 2. Он возвращается на ваш redirect URI.
const { code } = parseAtlassianCallbackUrl(request.url, { expectedState: sessionState });

// 3. Меняем код на токены.
const tokens = await obtainAtlassianOAuthTokens({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  redirectUri: 'https://your-app.example/callback',
  code,
});

// 4. Позже, когда access-токен истечёт.
const refreshed = await refreshAtlassianOAuthTokens({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  refreshToken: tokens.refreshToken,
});
```

Запрашивайте `offline_access`, если нужен refresh-токен.

## JWT (Atlassian Connect) не поддерживается

В 3.x JWT убран. Connect-приложения аутентифицируются как *приложение*: общий секрет и подписанный JWT на каждый запрос — модель, отличная от двух описанных выше, и жёстко связанная с жизненным циклом Connect.

Если вы пишете Connect-приложение, оставайтесь на `confluence.js@2`. См. [руководство по миграции](../migration/v2-to-v3).

## Куда уходят учётные данные

Никуда, кроме заголовка `Authorization` ваших же запросов. В пакете нет телеметрии, аналитики и сторонних хостов: единственные сетевые вызовы — те, что делаете вы, к тому `host`, который настроили.
