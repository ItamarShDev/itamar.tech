'use client';

import { useChatContext } from 'context/ChatContext';
import dynamic from 'next/dynamic';
import ChatButton from './chat/ChatButton';

const ChatWindow = dynamic(() => import('./chat/ChatWindow'), { ssr: false });

export default function PersonalChat() {
  const { isChatOpen, hasChatOpened, toggleChat, closeChat } = useChatContext();

  return (
    <>
      <ChatButton 
        onClick={toggleChat} 
        isOpen={isChatOpen} 
      />
      {hasChatOpened && <ChatWindow
        isOpen={isChatOpen} 
        onClose={closeChat} 
      />}
    </>
  );
}
