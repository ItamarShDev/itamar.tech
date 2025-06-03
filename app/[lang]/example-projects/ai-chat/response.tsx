"use client";

import ReactMarkdown from "react-markdown";

export default function AIChatResponse({ data }: { data: string }) {
	return (
		<div className="prose dark:prose-invert max-w-none">
			<ReactMarkdown>{data}</ReactMarkdown>
		</div>
	);
}
