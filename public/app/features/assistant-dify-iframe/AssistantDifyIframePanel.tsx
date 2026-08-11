import { css } from '@emotion/css';
import { useMemo } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { t, Trans } from '@grafana/i18n';
import { Icon, IconButton, useStyles2, useTheme2 } from '@grafana/ui';

import { useAssistantDifyIframeContext } from './AssistantDifyIframeContext';
import { getDifyEmbedUrl, withEmbedTheme } from './difyIframeClient';

export const ASSISTANT_DIFY_IFRAME_SIDEBAR_WIDTH = 380;

export function AssistantDifyIframePanel() {
  const styles = useStyles2(getStyles);
  const theme = useTheme2();
  const { isOpen, closeAssistant, iframeReloadKey, reloadIframe } = useAssistantDifyIframeContext();

  const embedUrl = getDifyEmbedUrl();
  const themedEmbedUrl = useMemo(() => {
    if (!embedUrl) {
      return '';
    }
    return withEmbedTheme(embedUrl, theme);
  }, [embedUrl, theme]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.panel}
      role="complementary"
      aria-label={t('assistant-dify-iframe.panel.aria-label', 'Grafana Assistant')}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Icon name="ai-sparkle" size="lg" className={styles.headerIcon} />
          <span className={styles.headerTitle}>
            <Trans i18nKey="assistant-dify-iframe.header.title">Grafana Assistant</Trans>
          </span>
        </div>
        <div className={styles.headerActions}>
          <IconButton
            name="sync"
            size="md"
            tooltip={t('assistant-dify-iframe.actions.reload', 'New conversation')}
            onClick={reloadIframe}
            aria-label={t('assistant-dify-iframe.actions.reload', 'New conversation')}
            disabled={!embedUrl}
          />
          <IconButton
            name="times"
            size="lg"
            tooltip={t('assistant-dify-iframe.actions.close', 'Close assistant')}
            onClick={closeAssistant}
            aria-label={t('assistant-dify-iframe.actions.close', 'Close assistant')}
          />
        </div>
      </div>

      <div className={styles.iframeShell}>
        {!embedUrl && (
          <div className={styles.errorBox}>
            <p className={styles.errorLine}>
              <Trans i18nKey="assistant-dify-iframe.errors.missing-url">
                No Dify embed URL configured. Set DIFY_EMBED_URL in{' '}
                <code>public/app/features/assistant-dify-iframe/difyEmbedConfig.ts</code> and rebuild.
              </Trans>
            </p>
          </div>
        )}

        {embedUrl && (
          <iframe
            key={`${iframeReloadKey}-${theme.isDark ? 'dark' : 'light'}`}
            className={styles.iframe}
            src={themedEmbedUrl}
            title={t('assistant-dify-iframe.iframe.title', 'Dify chatbot')}
            allow="microphone; clipboard-read; clipboard-write"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => ({
  panel: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: ASSISTANT_DIFY_IFRAME_SIDEBAR_WIDTH,
    backgroundColor: theme.colors.background.primary,
    borderLeft: `1px solid ${theme.colors.border.weak}`,
    overflow: 'hidden',
  }),
  header: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.colors.border.weak}`,
    backgroundColor: theme.colors.background.primary,
    minHeight: 48,
    flexShrink: 0,
  }),
  headerLeft: css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    minWidth: 0,
  }),
  headerIcon: css({
    color: theme.colors.warning.text,
    flexShrink: 0,
  }),
  headerTitle: css({
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.colors.text.primary,
    whiteSpace: 'nowrap',
  }),
  headerActions: css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    flexShrink: 0,
  }),
  iframeShell: css({
    flex: 1,
    minHeight: 0,
    position: 'relative',
    backgroundColor: theme.colors.background.secondary,
  }),
  iframe: css({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: theme.colors.background.primary,
  }),
  errorBox: css({
    padding: theme.spacing(2),
    color: theme.colors.error.text,
    fontSize: theme.typography.bodySmall.fontSize,
    lineHeight: 1.5,
  }),
  errorLine: css({
    margin: theme.spacing(0, 0, 0.5, 0),
  }),
});
