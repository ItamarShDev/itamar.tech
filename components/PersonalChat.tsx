'use client';

import { useChatContext } from 'context/ChatContext';
import { ChatButton, ChatWindow } from './chat';

export default function PersonalChat() {
  const { isChatOpen, toggleChat, closeChat } = useChatContext();

  return (
    <>
      <ChatButton 
        onClick={toggleChat} 
        isOpen={isChatOpen} 
      />
      <ChatWindow 
        isOpen={isChatOpen} 
        onClose={closeChat} 
      />
    </>
  );
}
