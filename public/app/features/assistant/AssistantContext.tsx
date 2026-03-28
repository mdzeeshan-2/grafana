import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'up' | 'down';
}

export interface AssistantContextType {
  isOpen: boolean;
  toggleAssistant: () => void;
  openAssistant: () => void;
  closeAssistant: () => void;
  messages: AssistantMessage[];
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  clearMessages: () => void;
  setMessageFeedback: (id: string, feedback: 'up' | 'down') => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

const AssistantContext = createContext<AssistantContextType>({
  isOpen: false,
  toggleAssistant: () => {},
  openAssistant: () => {},
  closeAssistant: () => {},
  messages: [],
  addMessage: () => {},
  clearMessages: () => {},
  setMessageFeedback: () => {},
  isTyping: false,
  setIsTyping: () => {},
});

export function useAssistantContext() {
  return useContext(AssistantContext);
}

let messageIdCounter = 0;

export function AssistantContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleAssistant = useCallback(() => setIsOpen((prev) => !prev), []);
  const openAssistant = useCallback(() => setIsOpen(true), []);
  const closeAssistant = useCallback(() => setIsOpen(false), []);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const msg: AssistantMessage = {
      id: `msg-${++messageIdCounter}`,
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const setMessageFeedback = useCallback((id: string, feedback: 'up' | 'down') => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, feedback } : m)));
  }, []);

  return (
    <AssistantContext.Provider
      value={{
        isOpen,
        toggleAssistant,
        openAssistant,
        closeAssistant,
        messages,
        addMessage,
        clearMessages,
        setMessageFeedback,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}
