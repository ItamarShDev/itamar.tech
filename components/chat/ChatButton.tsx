'use client';

import { useState } from 'react';
import styles from './ChatButton.module.css';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`${styles.chatButton} ${isOpen ? styles.hidden : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle chat"
    >
      <div className={styles.iconContainer}>
        {isOpen ? (
          <svg 
            className={styles.icon} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg 
            className={styles.icon} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </div>
      
      {isHovered && !isOpen && (
        <div className={styles.tooltip}>
          Ask me anything!
        </div>
      )}
      
      {isOpen && (
        <div className={styles.badge}>
          <span className={styles.pulse} />
        </div>
      )}
    </button>
  );
}
