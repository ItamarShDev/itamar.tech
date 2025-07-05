"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./RandomQuotes.module.css";

interface quoteData {
	role: string;
	profile: string;
	quotes: string[];
}
interface quotes {
	[name: string]: quoteData;
}
interface quote {
	role?: string;
	profile?: string;
	quote: string;
}
interface Props {
	quotes: quotes;
}
function extractQuotesByPerson(quotes: quotes): quote[] {
	let quotesResult: quote[] = [];
	for (const userQuotes in quotes) {
		const quoteList = quotes[userQuotes].quotes.map((quote) => ({
			role: quotes[userQuotes].role,
			profile: quotes[userQuotes].profile,
			quote: quote,
		}));

		quotesResult = [...quotesResult, ...quoteList];
	}
	return quotesResult;
}
export default function RandomQuotes(props: Props) {
	// Move hooks to the top before any conditional returns
	const [currentQuote, setCurrentQuote] = useState<quote | null>(null);
	const [isVisible, setIsVisible] = useState(true);
	const [isPaused, setIsPaused] = useState(false);
	
	// Use useMemo to prevent quotes array from changing on every render
	const quotes = useMemo(() => {
		return props.quotes ? extractQuotesByPerson(props.quotes) : [];
	}, [props.quotes]);
	
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
