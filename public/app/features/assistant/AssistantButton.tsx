import { t } from '@grafana/i18n';
import { ToolbarButton } from '@grafana/ui';

import { useAssistantContext } from './AssistantContext';

export function AssistantButton() {
  const { isOpen, toggleAssistant } = useAssistantContext();

  return (
    <ToolbarButton
      icon="ai-sparkle"
      iconOnly
      variant={isOpen ? 'active' : 'default'}
      onClick={toggleAssistant}
      tooltip={
        isOpen
          ? t('navigation.assistant.close-tooltip', 'Close Grafana Assistant')
          : t('navigation.assistant.open-tooltip', 'Open Grafana Assistant')
      }
      aria-label={
        isOpen
          ? t('navigation.assistant.close-tooltip', 'Close Grafana Assistant')
          : t('navigation.assistant.open-tooltip', 'Open Grafana Assistant')
      }
    />
  );
}
