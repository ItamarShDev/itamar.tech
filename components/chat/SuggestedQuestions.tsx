'use client';

import { useTranslation } from 'translations/hooks';
import styles from './SuggestedQuestions.module.css';

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

const defaultQuestions = [
  "What's your name and what do you do?",
  "Tell me about your projects",
  "What skills do you have?",
  "How can I contact you?",
  "What websites have you built?",
  "What technologies do you work with?",
  "Are we a good match?",
  "How compatible are we based on skills?",
  "What's our match percentage?",
  "Do we share similar technical interests?",
  "Help me create a chart",
  "Show me chart examples"
];

export default function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  const { translations: chatTranslations } = useTranslation('chat');
  
  const questions = chatTranslations?.suggestedQuestions || defaultQuestions;
  const titleText = chatTranslations?.askMeAnything || 'Ask me anything:';

  return (
    <div className={styles.container}>
      <p className={styles.title}>{titleText}</p>
      <div className={styles.questions}>
        {questions.map((question, index) => (
          <button
            key={index}
            className={styles.question}
            onClick={() => onSelectQuestion(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
