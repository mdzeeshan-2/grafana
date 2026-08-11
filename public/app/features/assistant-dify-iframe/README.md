# Grafana Assistant (Dify iframe)

The Grafana Assistant sidebar, opened from the **sparkle icon** in the top bar. It embeds the
native Dify chatbot UI inside a Grafana-styled panel shell.

## Changing the Dify URL

Edit **one line** in `difyEmbedConfig.ts`:

```1:1:public/app/features/assistant-dify-iframe/difyEmbedConfig.ts
export const DIFY_EMBED_URL = 'https://udify.app/chat/g9NdPvIL7CjhOhCX';
```

Replace the URL with the one from your Dify app: **Publish → Embed Into Site**. Then rebuild the
frontend (`yarn build`, or restart `yarn start`) and reload the browser.

This URL is safe to keep in source — Dify's "Embed" link is meant to be embedded on any public
website. It is **not** a private API key.

## How it works

```
Grafana top bar (sparkle icon)
        │
        ▼
AssistantDifyIframeButton  ──toggles──▶  AssistantDifyIframeContext (isOpen state)
        │                                          │
        ▼                                          ▼
AppChrome renders AssistantDifyIframePanel when isOpen
        │
        ▼
difyIframeClient.getDifyEmbedUrl()  ──reads──▶  difyEmbedConfig.ts (DIFY_EMBED_URL constant)
        │
        ▼
<iframe src={embedUrl}> renders Dify's own chat UI directly in the browser
```

No backend, no proxy server, no environment file — the URL is compiled into the frontend bundle
at build time, so it works identically for every user hitting the Grafana server, not just on a
single dev machine.

## UI notes

- The **outer shell** (header, 380px width, borders, close/reload buttons) is styled to match Grafana's design system.
- The **chat UI inside the iframe** is Dify's own — it can't be restyled from Grafana due to iframe sandboxing.
- Use the **sync** icon in the header to reload the iframe (starts a new conversation).
- A `?theme=dark|light` query param is appended based on the current Grafana theme, used if your Dify app supports it.

## Deploying to another server

Since this is plain frontend source code (no backend/Go changes), deploying to a different
machine just means: get this same source tree onto that machine, then rebuild.

1. Push this repo to GitHub (or your fork) — already the transport mechanism, no direct file copy needed.
2. On the target server: `git clone`/`git pull` the repo, `yarn install --immutable`, `yarn build`.
3. Point Grafana's existing static file serving at the resulting `public/build` output (this is
   the same directory Grafana already serves from — no new server process required).
4. Restart/reload Grafana so it picks up the new static assets.
