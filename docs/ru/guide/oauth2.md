---
title: OAuth 2.0 (3LO)
description: Настройка Atlassian OAuth 2.0 (3LO) в confluence.js — регистрация приложения, scopes для v1 и v2, поток авторизации, автообновление с ротацией токенов и что на самом деле означают частые ошибки.
---

# OAuth 2.0 (3LO)

Трёхногий OAuth позволяет приложению действовать **от имени пользователя**, с его согласия, никогда не видя ни пароля, ни API-токена.

Он нужен, когда вы делаете продукт, в который заходят другие люди. Для скрипта, крона и всего, что действует от вашего лица, проще [API-токен](./authentication#basic-api-токен) — там нет ни одной из описанных ниже подвижных частей.

## Главная ловушка

Токен 3LO **не работает на домене вашего сайта**. `https://your-domain.atlassian.net` ответит `401` независимо от того, насколько токен валиден. Atlassian принимает такие токены только через свой шлюз:

```
https://api.atlassian.com/ex/confluence/{cloudId}/wiki/api/v2/pages
```

Клиент собирает этот URL сам — поэтому под OAuth 2.0 `host` необязателен и игнорируется. Если разбираетесь с необъяснимым 401, начните с URL.

## 1. Зарегистрируйте приложение

В [консоли разработчика](https://developer.atlassian.com/console/myapps/) создайте **OAuth 2.0 integration**.

**Access type.** Берите *Resource-level*, если нет причин иначе: доступ ограничится одним сайтом, который выберет пользователь. *Account-level* выдаёт доступ ко всем сайтам его аккаунта.

**Authorization → callback URL.** Куда Atlassian вернёт пользователя. Для разработки принимается `http://localhost:3000/callback`, в проде обязателен HTTPS.

**Settings → Client ID и Secret.** Секрет — это учётные данные: держите его на сервере, вне системы контроля версий, и никогда не отдавайте в браузер.

## 2. Выберите scopes — с оглядкой на версию API

Именно здесь теряют полдня. В Confluence **два семейства scopes**, и они соответствуют двум версиям API:

| Семейство | Выглядит как | Покрывает |
|---|---|---|
| **Granular** | `read:page:confluence` | эндпоинты v2 — `/wiki/api/v2/…` |
| **Classic** | `read:confluence-content.all` | эндпоинты v1 — `/wiki/rest/api/…` |

**Их можно совмещать в одном приложении, и если вы пользуетесь обеими версиями API — обязаны.** Приложение только с granular получит `401 Unauthorized; scope does not match` от любого v1-эндпоинта, и наоборот. Обе вкладки находятся в Permissions → Confluence API → Configure.

Частые granular scopes:

| Scope | Нужен для |
|---|---|
| `read:page:confluence` | чтения страниц |
| `write:page:confluence` | создания и обновления страниц |
| `delete:page:confluence` | удаления страниц |
| `read:space:confluence` | `GET /spaces` |
| `read:space-details:confluence` | деталей пространства — **не** заменяет предыдущий |
| `read:attachment:confluence` | вложений |

Последние два стоит перечитать: `read:space-details:confluence` *не* даёт получить список пространств.

Всегда добавляйте **`offline_access`**, иначе refresh-токена не будет и доступ умрёт через час.

Если эндпоинт отказывает, точный нужный scope назван в документации этой операции.

## 3. Отправьте пользователя на согласие

```ts
import { generateAuthorizationUrl } from 'confluence.js';
import { randomUUID } from 'node:crypto';

const state = randomUUID();

session.oauthState = state; // должен дожить до колбэка

const url = generateAuthorizationUrl({
  clientId: process.env.OAUTH_CLIENT_ID!,
  scopes: ['read:page:confluence', 'write:page:confluence', 'offline_access'],
  redirectUri: 'https://your-app.example/callback',
  state,
});

return redirect(url);
```

`state` здесь не украшение. Он связывает колбэк с сессией, которая его начала, и именно он не даёт подставить чужую авторизацию в аккаунт вашего пользователя. Генерируйте непредсказуемое значение на каждый запрос.

## 4. Обработайте колбэк

```ts
import { exchangeAuthorizationCode, parseCallbackUrl } from 'confluence.js';

const { code } = parseCallbackUrl(request.url, { expectedState: session.oauthState });

const tokens = await exchangeAuthorizationCode({
  clientId: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  code,
  redirectUri: 'https://your-app.example/callback',
});

await tokenStore.save({
  refreshToken: tokens.refreshToken,
  expiresAt: Date.now() + tokens.expiresIn * 1000,
});
```

`parseCallbackUrl` закрывает три способа провалить этот шаг, и все три легко забыть вручную: пользователь нажал **Cancel** (`error=access_denied`, кода нет), `state` отсутствует или не совпадает, либо это вообще не колбэк. Каждый случай бросает `OAuthError`.

## 5. Делайте запросы

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({
  auth: {
    type: 'oauth2',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    refreshToken: await tokenStore.refreshToken(),
    expiresAt: await tokenStore.expiresAt(),
    onTokenRefresh: async ({ refreshToken, expiresAt }) => {
      await tokenStore.save({ refreshToken, expiresAt });
    },
  },
});

await confluence.page.getPages({ limit: 25 });
```

Ни `host`, ни `cloudId`: клиент сам зовёт `accessible-resources`, находит единственный доступный токену сайт, кэширует его id и направляет всё через шлюз. Токен обновляется до истечения, а на `401` запрос один раз повторяется.

### Нужны обе версии API? Разделите один клиент

У каждого клиента своё состояние токена. Два клиента с одними учётными данными будут обновляться независимо — а поскольку Atlassian ротирует refresh-токен при каждом обновлении, тот, кто успел первым, обесценит копию второго. Создайте клиент один раз и передайте обеим фабрикам:

```ts
import { createClient } from 'confluence.js/core';
import { createV1Client, createV2Client } from 'confluence.js';

const client = createClient({ auth: { type: 'oauth2', /* … */ } });

const v1 = createV1Client(client);
const v2 = createV2Client(client);
```

### Выбор сайта

Если токен дотягивается до нескольких сайтов Confluence — укажите, до какого; иначе клиент откажется угадывать и перечислит найденные:

```ts
auth: { type: 'oauth2', /* … */, cloudId: 'a436e0ec-…' }
auth: { type: 'oauth2', /* … */, siteUrl: 'https://your-domain.atlassian.net' }
```

`cloudId` полностью пропускает запрос к справочнику — его стоит закэшировать, как только он известен.

Чтобы показать пользователю выбор, спросите напрямую:

```ts
import { getAccessibleResources } from 'confluence.js';

const sites = await getAccessibleResources(accessToken); // [{ id, name, url, scopes }]
```

## Ротация refresh-токенов — прочитайте один раз, внимательно

Atlassian выдаёт **ротируемые** refresh-токены. Каждое обновление возвращает новый и **убивает тот, что вы отправили**.

Следствия все одной природы:

- **Сохраняйте новый токен каждый раз.** Для этого и нужен `onTokenRefresh`; он ожидается до того, как запрос уйдёт, так что медленная запись не потеряет ротацию.
- **Не делите один refresh-токен между процессами.** Два воркера, обновляющиеся от одного сохранённого токена, — это гарантия, что у одного окажется мёртвый.
- **90 дней неактивности прекращают доступ.** Каждое обновление сбрасывает этот счётчик; токен, не использованный 90 дней, пропал, и пользователю придётся давать согласие заново.

### Что на самом деле отвечает токен-эндпоинт

Atlassian документирует `invalid_grant` для мёртвого refresh-токена. На практике живой эндпоинт устроен неаккуратнее, и коды пересекаются так, что об этом стоит знать — таблица получена измерением, а не чтением:

| Что произошло | Статус | `error` | `errorDescription` |
|---|---|---|---|
| Refresh-токен неизвестен или ротирован | 403 | `unauthorized_client` | `refresh_token is invalid` |
| Refresh-токен протух или отозван (по докам) | 403 | `invalid_grant` | `Unknown or invalid refresh token.` |
| **Неверный client secret** | 401 | `access_denied` | `Unauthorized` |

Ловушка в последней строке: неверный секрет приложения даёт `access_denied` — тот же код, что и отказ пользователя на экране согласия. Ветвление по одному коду отправляло бы людей на согласие по кругу из-за неправильной переменной окружения.

`isReauthorizationRequired` эту разницу знает: он покрывает первые две строки и отказ, увиденный через `parseCallbackUrl`, и возвращает `false` для проблемы с учётными данными — она остаётся обычным `OAuthError`.

Мёртвый доступ не чинится обновлением — лечится только новой авторизацией:

```ts
import { isReauthorizationRequired } from 'confluence.js';

try {
  await confluence.page.getPages({});
} catch (error) {
  if (isReauthorizationRequired(error)) {
    await tokenStore.clear();

    return redirect(generateAuthorizationUrl({ /* … */ }));
  }

  throw error;
}
```

Тот же предикат покрывает `access_denied` при отказе на экране согласия — лечится это одинаково.

## Если токенами управляете вы сами

Когда обновление живёт в другой части системы, передайте только access-токен:

```ts
auth: { type: 'oauth2', accessToken, cloudId }
```

Обновлять клиент не станет — ему нечем, — поэтому истёкший токен придёт как `AuthError`.

Для обновления вручную экспортируется `refreshOAuth2Token`.

## Разбор частых ошибок

| Симптом | Причина |
|---|---|
| `401` на `your-domain.atlassian.net` | Токены 3LO работают только через `api.atlassian.com`. Уберите `host` и дайте клиенту собрать URL. |
| `401 Unauthorized; scope does not match` | Scope не выдан приложению. Проверьте granular против classic для вызываемой версии API. Приходит как `ScopeError`; обновление токена не поможет. |
| `403 invalid_grant` | Refresh-токен мёртв: ротирован и не сохранён, протух после 90 дней простоя, или пользователь сменил пароль. Нужна повторная авторизация. |
| В обмене нет `refreshToken` | В запрошенных scopes не было `offline_access`. |
| `Multiple accessible Confluence resources found` | Токен дотягивается до нескольких сайтов. Передайте `cloudId` или `siteUrl`. |
| `No accessible Confluence resources` | Выданные scopes не покрывают ни одного сайта Confluence, либо у пользователя нет доступа ни к одному. |

## Чеклист безопасности

- Client secret остаётся на сервере. Никогда в бандле для браузера, никогда в git.
- Свежий непредсказуемый `state` на каждую авторизацию, привязанный к сессии и проверяемый при возврате — проверку делает `parseCallbackUrl`.
- Запрашивайте минимальные работающие scopes. Они показываются на экране согласия, и пользователи их читают.
- Храните refresh-токены зашифрованными; относитесь к ним как к паролям, потому что это они и есть.
- Предпочитайте *Resource-level*, чтобы доступ покрывал один сайт, а не весь аккаунт.
- Отзыв доступа делает пользователь в настройках своего аккаунта Atlassian — отдельного эндпоинта для этого нет.
