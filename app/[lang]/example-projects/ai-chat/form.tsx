"use client";
import { useRef, useState, useTransition } from "react";
import AIChatResponse from "./response";
import styles from "./style.module.css";
import type { ChatHistory } from "./types";

export function AIChatForm() {
	const abortController = useRef(new AbortController());
	const [isPending, startTransition] = useTransition();
	const [history, setHistory] = useState<ChatHistory[]>([]);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		startTransition(async () => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			const message = formData.get("message") as string;
			const model = formData.get("model") as string;
			const lastMessage = history[history.length - 1];
			const newMessage = { message, model, response: "" };
			if (message) {
				abortController.current.abort();
				abortController.current = new AbortController();
				const response = await fetch("/api/chat", {
					method: "POST",
					body: JSON.stringify({
						message,
						model,
						context: lastMessage?.response,
					}),
					signal: abortController.current.signal,
				});
				const reader = response.body?.getReader();
				let result = "";
				if (!reader) {
					return;
				}
				setHistory((prev) => [...prev, newMessage]);
				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						break;
					}
					result += new TextDecoder().decode(value);
					newMessage.response = result;
					setHistory((prev) => {
						prev[prev.length - 1].response = result;
						return prev;
					});
				}
				(e.target as HTMLFormElement).reset();
			}
		});
		return false;
	};
	return (
		<section className={styles.container}>
			<h1>AI Chat</h1>
			<section className={styles.chat}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.modelSelector}>
						<select name="model" id="model">
							<option value="gemini-2.5-flash-preview-05-20">
								Gemini 2.5 Flash Preview
							</option>
							<option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
							<option value="gemini-2.0-flash-lite">
								Gemini 2.0 Flash Lite
							</option>
						</select>
						<button
							type="button"
							disabled={isPending || history.length === 0}
							onClick={() => setHistory([])}
						>
							Start New Session
						</button>
					</div>
					<section className={styles.messages}>
						{history.map((message) => (
							<AIChatResponse key={message.message} data={message} />
						))}
					</section>
					<fieldset className={styles.formControls} disabled={isPending}>
						<input name="message" />
						<button type="submit">{isPending ? "Loading..." : "Send"}</button>
					</fieldset>
				</form>
			</section>
		</section>
	);
}
