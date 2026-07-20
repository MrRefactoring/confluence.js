> 🌐 **English** · [Русский](README.ru.md)

# confluence.js playground

Self-contained mini-projects for trying `confluence.js` against a real Confluence: fill in a small config and get an actual response back.

Each folder is an **independent npm project** — its own `package.json`, its own dependencies, its own instructions. They run standalone and can be lifted out into another repository as they are.

## Scenarios

| Scenario | What it shows |
|---|---|
| [`oauth2/`](./oauth2/) | The whole OAuth 2.0 (3LO) flow: consent in the browser → tokens → cloud id → requests, with rotating-token refresh you can watch happen |

## Before running anything

The scenarios link against the **local** build (`"confluence.js": "file:../.."`), so they see changes that are not published yet. Build the root once:

```bash
# from the repository root
pnpm install
pnpm build
```

Then go into a scenario and follow its `README.md`.

## Adding a scenario

1. Copy an existing folder to `playground/<name>/`.
2. Replace `src/`, update `name` in `package.json`, rewrite the `README.md`.
3. Add a row to the table above.

Nothing is shared between scenarios. That is deliberate: each stays independent, and anyone can copy one out without untangling it first.
