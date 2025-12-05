'use client';

import styles from './SuggestedQuestions.module.css';

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

const suggestedQuestions = [
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
  return (
    <div className={styles.container}>
      <p className={styles.title}>Ask me anything:</p>
      <div className={styles.questions}>
        {suggestedQuestions.map((question, index) => (
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
