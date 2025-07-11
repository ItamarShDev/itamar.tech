import { useEffect, useRef, useState } from 'react';

export const DEFAULT_EMOJIS = ["🤩", "🫶", "🫵", "👋", "🙏🏼"] as const;
export const DEFAULT_INTERVAL = 5000;

/**
 * A custom hook that cycles through an array of emojis at a specified interval
 * @param options - Configuration options
 * @param options.emojis - Array of emojis to cycle through (default: ["🤩", "🫶", "🫵", "👋", "🙏🏼"])
 * @param options.interval - Time in milliseconds between emoji changes (default: 5000)
 * @returns The current emoji
 */
export function useRandomEmoji({
  emojis = DEFAULT_EMOJIS,
  interval = DEFAULT_INTERVAL,
}: {
  emojis?: string[];
  interval?: number;
} = {}) {
  const [emoji, setEmoji] = useState(emojis[0] || '');
  const indexRef = useRef<number>(0);

  useEffect(() => {
    if (emojis.length === 0) {
      setEmoji('');
      return;
    }

    const intervalId = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % emojis.length;
      setEmoji(emojis[indexRef.current]);
    }, interval);

    return () => clearInterval(intervalId);
  }, [emojis, interval]);

  return emoji;
}
