import { GrafanaTheme2 } from '@grafana/data';

import { DIFY_EMBED_URL } from './difyEmbedConfig';

/** Append theme hints so the embedded Dify UI tracks Grafana light/dark mode when supported. */
export function withEmbedTheme(embedUrl: string, theme: GrafanaTheme2): string {
  try {
    const url = new URL(embedUrl);
    url.searchParams.set('theme', theme.isDark ? 'dark' : 'light');
    return url.toString();
  } catch {
    return embedUrl;
  }
}

export function getDifyEmbedUrl(): string {
  return DIFY_EMBED_URL;
}
