> [English](README.md) · 🌐 **Русский**

# Playground: OAuth 2.0 (3LO)

Прогоняет весь трёхногий поток на живом Confluence и печатает, что происходит на каждом шаге: согласие, обмен кода на токены, поиск сайта, запрос и обновление токена.

## Подготовка

**1. Соберите библиотеку** (один раз, из корня репозитория):

```bash
pnpm install
pnpm build
```

**2. Зарегистрируйте приложение** в [консоли разработчика](https://developer.atlassian.com/console/myapps/) как *OAuth 2.0 integration*.

В **Permissions → Confluence API → Configure** добавьте scopes, которые использует сценарий. Он зовёт обе версии API, поэтому нужны обе вкладки: granular `read:page:confluence` и `read:space:confluence` для v2, classic `read:confluence-content.all` для v1.

В **Authorization** укажите callback URL ровно такой:

```
http://localhost:3000/callback
```

**3. Заполните конфиг:**

```bash
cd playground/oauth2
cp src/config.example.ts src/config.ts
```

Впишите Client ID и Secret в `src/config.ts`. Файл в `.gitignore`, так что секрет в git не попадёт.

**4. Запустите:**

```bash
npm install
npm start
```

Откроется браузер с экраном согласия. Подтвердите, выберите сайт — дальше всё произойдёт в терминале.

## Что должно получиться

```
1. Consent
   https://auth.atlassian.com/authorize?…
   consent granted
2. Exchanging the code for tokens
   access token expires in 3600s
3. Sites this grant reaches: your-site (b3e23446-…)
4. Driving both API versions through the one client
   ↻ token refreshed (#1), next expiry 2026-07-19T12:45:57.912Z
   v2 → 3 page(s)
   v1 → 2 restriction(s) on page 262237
```

## Две вещи, ради которых всё это

**Обновление токена происходит не случайно.** Только что полученный токен живёт час, поэтому скрипт намеренно помечает его истёкшим — иначе обновления пришлось бы ждать час. Каждое обновление возвращает новый refresh-токен и убивает отправленный; ровно для этого нужен `onTokenRefresh`. Настоящее приложение сохраняет его там — потеряете, и пользователь начнёт с экрана согласия заново.

**Один токен — обе версии API.** v2 отвечает на granular scopes, v1 — на classic, и один грант несёт оба; именно поэтому один клиент тянет обе версии. Ловушка в том, что scopes выдаются на *эндпоинт*, а не на версию: держать нужное семейство мало, и `ScopeError` укажет операцию, которой не хватает конкретного scope. Нужный scope назван в документации этой операции.

## Если не работает

| Симптом | Причина |
|---|---|
| Браузер ругается на redirect_uri | Callback URL в консоли не совпадает с `http://localhost:3000/callback` буква в букву |
| `EADDRINUSE` на порту 3000 | Порт занят; поменяйте `port` в `src/config.ts` и поправьте консоль под него |
| Не пришёл refresh-токен | В `scopes` нет `offline_access` |
| `ScopeError` | Конкретный scope, который называет операция, не настроен у приложения или не был запрошен |
