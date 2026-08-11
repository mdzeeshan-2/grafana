/**
 * Grafana Assistant (Dify iframe) — embed URL configuration.
 *
 * ============================================================
 *  TO SWITCH TO A DIFFERENT DIFY APP / CHATBOT:
 *  Just replace the URL below, then rebuild the frontend
 *  (`yarn build` or restart `yarn start`). No other file
 *  needs to change.
 * ============================================================
 *
 * Where to get this URL from Dify:
 *   Dify app → Publish → Embed Into Site → copy the "chat" URL,
 *   e.g. https://udify.app/chat/XXXXXXXXXXXXXXXX
 *   (Chatflow apps use /chat/, older Chatbot apps use /chatbot/)
 *
 * This URL is safe to hardcode here — Dify's "Embed" link is
 * designed to be publicly embeddable in any website's HTML/iframe,
 * it is NOT a private secret like an API key.
 */
export const DIFY_EMBED_URL = 'https://udify.app/chat/g9NdPvIL7CjhOhCX';
