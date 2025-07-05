"use client";
import { useEffect, useState } from "react";
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
	if (!props.quotes) {
		return null; // Don't render anything if quotes are not available
	}
	
	const quotes = extractQuotesByPerson(props.quotes);
	
	if (quotes.length === 0) {
		return null; // Don't render anything if no quotes are available
	}
	
	const [currentQuote, setCurrentQuote] = useState(quotes[0]);
	const [isVisible, setIsVisible] = useState(true);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
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
	}, [isPaused, quotes]);

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
