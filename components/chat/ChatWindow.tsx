'use client';

import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import SuggestedQuestions from './SuggestedQuestions';
import styles from './ChatWindow.module.css';

interface Message {
  type: 'message' | 'response';
  content: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'response',
      content: "Hi! I'm Itamar's AI assistant. I can tell you all about him - his projects, skills, and how to get in touch. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const messageContent = inputValue.trim();
    const userMessage = {
      type: 'message' as const,
      content: messageContent
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Use the shared API function
    sendMessageToAPI(messageContent);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    // Send the suggested question directly without setting input
    if (isLoading) return;
    
    const userMessage = {
      type: 'message' as const,
      content: question.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Trigger the same API call as handleSendMessage
    sendMessageToAPI(question.trim());
  };

  const sendMessageToAPI = async (messageContent: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { type: 'message' as const, content: messageContent }],
          useTanStack: true
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      let aiResponse = '';
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  aiResponse += data.content;
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.type === 'response') {
                      lastMessage.content = aiResponse;
                    } else {
                      newMessages.push({
                        type: 'response',
                        content: aiResponse
                      });
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }

      if (!aiResponse) {
        throw new Error('No response received');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        type: 'response',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <h5>Ask about Itamar</h5>
        <div className={styles.headerButtons}>
          <button className={styles.newChatButton} onClick={handleNewChat} title="New Chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M12 7v5l3 3" />
            </svg>
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            isUser={message.type === 'message'}
            isTyping={index === messages.length - 1 && isLoading}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 0 && (
        <SuggestedQuestions onSelectQuestion={handleSuggestedQuestion} />
      )}

      {messages.length === 1 && (
        <SuggestedQuestions onSelectQuestion={handleSuggestedQuestion} />
      )}

      {messages.length >= 2 && messages.length % 2 === 0 && !isLoading && (
        <SuggestedQuestions onSelectQuestion={handleSuggestedQuestion} />
      )}

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className={styles.input}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className={styles.sendButton}
        >
          {isLoading ? (
            <div className={styles.spinner} />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
