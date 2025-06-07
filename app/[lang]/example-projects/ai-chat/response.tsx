"use client";

import ReactMarkdown from "react-markdown";
import styles from "./style.module.css";
import type { ChatHistory } from "./types";

export default function AAnimationTimelineIChatResponse({
	data,
	idx,
	withLoader,
}: {
	data: ChatHistory;
	idx?: number;
	withLoader?: boolean;
}) {
	return (
		<div className={styles.response}>
			<section className={styles.title}>
				{idx}: {data.message}
				{withLoader && <div className={styles.loader} />}
			</section>
			<div className={styles.content}>
				<ReactMarkdown>{data.response}</ReactMarkdown>
			</div>
		</div>
	);
}
