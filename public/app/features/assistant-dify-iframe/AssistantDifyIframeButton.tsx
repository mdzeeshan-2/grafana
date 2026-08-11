import { t } from '@grafana/i18n';
import { ToolbarButton } from '@grafana/ui';

import { useAssistantDifyIframeContext } from './AssistantDifyIframeContext';

export function AssistantDifyIframeButton() {
  const { isOpen, toggleAssistant } = useAssistantDifyIframeContext();

  return (
    <ToolbarButton
      icon="ai-sparkle"
      iconOnly
      variant={isOpen ? 'active' : 'default'}
      onClick={toggleAssistant}
      tooltip={
        isOpen
          ? t('navigation.assistant-dify-iframe.close-tooltip', 'Close Grafana Assistant')
          : t('navigation.assistant-dify-iframe.open-tooltip', 'Open Grafana Assistant')
      }
      aria-label={
        isOpen
          ? t('navigation.assistant-dify-iframe.close-tooltip', 'Close Grafana Assistant')
          : t('navigation.assistant-dify-iframe.open-tooltip', 'Open Grafana Assistant')
      }
    />
  );
}
