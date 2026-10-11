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
export function useRandomEmoji(): (typeof DEFAULT_EMOJIS)[number];
export function useRandomEmoji(options: {
  emojis?: readonly string[];
  interval?: number;
}): string;
export function useRandomEmoji({
  emojis = DEFAULT_EMOJIS,
  interval = DEFAULT_INTERVAL,
}: {
  emojis?: readonly string[];
  interval?: number;
} = {}) {
  const [emoji, setEmoji] = useState<string>(emojis[0] || '');
  const indexRef = useRef<number>(0);

  useEffect(() => {
    if (emojis.length === 0) {
      // Avoid synchronous state update warning and missing dependency
      requestAnimationFrame(() => {
        setEmoji(prev => prev !== '' ? '' : prev);
      });
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
