> 🌐 **English** · [Русский](README.ru.md)

# OAuth 2.0 (3LO) playground

Runs the whole three-legged flow against a real Confluence and prints what happens at each step: consent, token exchange, site lookup, a request, and a refresh.

## Setup

**1. Build the library** (once, from the repository root):

```bash
pnpm install
pnpm build
```

**2. Register an app** at the [developer console](https://developer.atlassian.com/console/myapps/) as an *OAuth 2.0 integration*.

Under **Permissions → Confluence API → Configure**, add the scopes this scenario uses. It calls both API versions, so it needs both tabs: granular `read:page:confluence` and `read:space:confluence` for v2, classic `read:confluence-content.all` for v1.

Under **Authorization**, set the callback URL to exactly:

```
http://localhost:3000/callback
```

**3. Fill in the config:**

```bash
cd playground/oauth2
cp src/config.example.ts src/config.ts
```

Put your Client ID and Secret in `src/config.ts`. It is gitignored, so the secret stays out of git.

**4. Run:**

```bash
npm install
npm start
```

A browser opens for consent. Approve, pick a site, and the rest happens in the terminal.

## What you should see

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

## The two things worth understanding

**The refresh is not a coincidence.** The token that just arrived is good for an hour, so the script marks it expired on purpose — otherwise you would wait an hour to see a refresh. Every refresh returns a new refresh token and kills the one you sent, which is what `onTokenRefresh` is for. A real app persists it there; lose it and your user starts from consent again.

**One token, both API versions.** v2 answers to granular scopes and v1 to classic ones, and a single grant carries both — which is what lets one client drive both versions. The trap is that scopes are per *endpoint*, not per version: holding the right family is not enough, and a `ScopeError` names an operation whose specific scope is missing. Its API documentation names the scope it wants.

## If it fails

| Symptom | Cause |
|---|---|
| The browser shows a redirect_uri error | The callback URL in the console does not match `http://localhost:3000/callback` exactly |
| `EADDRINUSE` on port 3000 | Something else holds the port; change `port` in `src/config.ts` and update the console to match |
| No refresh token | `offline_access` is missing from `scopes` |
| `ScopeError` | The specific scope that operation names is not configured on the app, or was not requested |
