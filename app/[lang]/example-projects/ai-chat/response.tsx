"use client";

import ReactMarkdown from "react-markdown";
import styles from "./style.module.css";
import type { ChatHistory } from "./types";

export default function AIChatResponse({ data }: { data: ChatHistory }) {
	return (
		<div className={styles.response}>
			<section className={styles.title}>{data.message}</section>
			<ReactMarkdown>{data.response}</ReactMarkdown>
		</div>
	);
}
