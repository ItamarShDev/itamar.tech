'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface ChatContextType {
  isChatOpen: boolean;
  hasChatOpened: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasChatOpened, setHasChatOpened] = useState(false);

  const openChat = () => {
    setHasChatOpened(true);
    setIsChatOpen(true);
  };
  const closeChat = () => setIsChatOpen(false);
  const toggleChat = () => {
    setHasChatOpened(true);
    setIsChatOpen(prev => !prev);
  };

  return (
    <ChatContext.Provider value={{ isChatOpen, hasChatOpened, openChat, closeChat, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
