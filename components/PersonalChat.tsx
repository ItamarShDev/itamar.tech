'use client';

import { useState } from 'react';
import { ChatButton, ChatWindow } from './chat';

export default function PersonalChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <ChatButton 
        onClick={toggleChat} 
        isOpen={isChatOpen} 
      />
      <ChatWindow 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
}
