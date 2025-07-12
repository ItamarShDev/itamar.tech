"use client";
import { extractQuotesByPerson, type Quote, type QuotesCollection } from "lib/utils/quote";
import { useEffect, useState } from "react";
import styles from "./RandomQuotes.module.css";

interface Props {
	quotes: QuotesCollection;
}
// Using extractQuotesByPerson from lib/utils/quote
export default function RandomQuotes(props: Props) {
	const quotes = extractQuotesByPerson(props.quotes);
	const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
	const [isVisible, setIsVisible] = useState(true);
	const [isPaused, setIsPaused] = useState(false);

	// useEffect must be at the top level, not conditionally called
	useEffect(() => {
		if (!quotes.length) return;

		// Initialize currentQuote if it's null and we have quotes
		if (!currentQuote) {
			setCurrentQuote(quotes[0]);
			return;
		}

		if (isPaused) return;

		const fadeOutTime = 6000; // Time before starting to fade out
		const transitionTime = 1000; // Time for fade transition
		const totalCycleTime = fadeOutTime + transitionTime;

		const interval = setInterval(() => {
			// Start fade out
			setIsVisible(false);

			// After transition completes, change the quote and fade in
			setTimeout(() => {
				const randomIndex = Math.floor(Math.random() * quotes.length);
				setCurrentQuote(quotes[randomIndex]);
				setIsVisible(true);
			}, transitionTime);

		}, totalCycleTime);

		return () => {
			clearInterval(interval);
		};
	}, [isPaused, quotes, currentQuote]);

	// Conditional returns after all hooks
	if (!props.quotes || quotes.length === 0) {
		return null; // Don't render anything if quotes are not available
	}

	// Don't render if currentQuote is still null
	if (!currentQuote) {
		return null;
	}

	return (
		<div
			className={styles.container}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			<p
				className={`${styles.quote} ${isVisible ? styles.visible : styles.hidden}`}
			>
				{currentQuote.quote}
			</p>
		</div>
	);
}
