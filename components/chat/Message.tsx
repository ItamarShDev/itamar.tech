'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Message.module.css';

interface MessageProps {
  content: string;
  isUser: boolean;
  isTyping?: boolean;
}

export default function Message({ content, isUser, isTyping = false }: MessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // User messages should always show immediately
    if (isUser) {
      setDisplayedContent(content);
      setIsComplete(true);
      return;
    }

    // Detect if this is a streaming response (content is increasing)
    if (content.length > displayedContent.length && !hasAnimated) {
      setIsStreaming(true);
      setDisplayedContent(content);
      return;
    }

    // Stop streaming when content stops growing
    if (isStreaming && content.length === displayedContent.length) {
      setIsStreaming(false);
      setHasAnimated(true);
      setIsComplete(true);
      return;
    }

    // AI messages that have already been animated should show immediately
    if (hasAnimated) {
      setDisplayedContent(content);
      setIsComplete(true);
      return;
    }

    // Initial display for non-streaming messages
    setDisplayedContent(content);
    setIsComplete(true);
    setHasAnimated(true);
  }, [content, isUser, hasAnimated, isStreaming, displayedContent.length]);

  return (
    <div className={`${styles.message} ${isUser ? styles.user : styles.ai}`}>
      <div className={styles.messageContent}>
        {!isUser && (
          <div className={styles.avatar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        )}
        
        <div className={styles.text}>
          {isUser ? (
            displayedContent
          ) : (
            <ReactMarkdown>{displayedContent}</ReactMarkdown>
          )}
          {isStreaming && (
            <span className={styles.cursor}>|</span>
          )}
        </div>
        
        {isUser && (
          <div className={styles.avatar}>
            IS
          </div>
        )}
      </div>
    </div>
  );
}
