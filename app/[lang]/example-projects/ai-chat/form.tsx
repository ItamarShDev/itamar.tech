"use client";
import { useRef, useState } from "react";
import AIChatResponse from "./response";
import styles from "./style.module.css";

export default function AIChatPage() {
	const [data, setData] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const abortController = useRef(new AbortController());
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const message = formData.get("message");
		const model = formData.get("model");
		if (message) {
			abortController.current.abort();
			abortController.current = new AbortController();
			setLoading(true);
			setData(null);
			const response = await fetch("/api/chat", {
				method: "POST",
				body: JSON.stringify({ message, model }),
				signal: abortController.current.signal,
			});
			const reader = response.body?.getReader();
			let result = "";
			if (!reader) {
				return;
			}
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					break;
				}
				result += new TextDecoder().decode(value);
				setData(result);
			}
		}
		setLoading(false);
		return false;
	};
	return (
		<div>
			<h1>AI Chat</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<textarea name="message" />
				<select name="model" id="model">
					<option value="gemini-2.5-flash-preview-05-20">
						Gemini 2.5 Flash Preview
					</option>
					<option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
					<option value="gemini-2.0-flash-lite">Gemini 2.0 Flash Lite</option>
				</select>
				<button type="submit">Send</button>
				{loading && <span>Loading...</span>}
			</form>
			{data && <AIChatResponse data={data} />}
		</div>
	);
}
