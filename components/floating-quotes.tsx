"use client";
import { useIsRTL } from "lib/hooks/useTranslation";
import { useEffect, useState } from "react";
import styles from "./FloatingQuotes.module.css";

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
	const isRTL = useIsRTL();
	const quotes = extractQuotesByPerson(props.quotes);
	const [randomNumber, setRandomNumber] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			const randomNumber = Math.floor(Math.random() * 100);
			setRandomNumber(randomNumber);
		}, 4000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	const idx = randomNumber % quotes.length;

	return (
		<div className={styles.container}>
			<p className={`${styles.quote} ${isRTL ? styles.rtl : ""}`}>
				{quotes[idx].quote}
			</p>
		</div>
	);
}
