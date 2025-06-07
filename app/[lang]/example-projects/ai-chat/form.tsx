"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import AIChatResponse from "./response";
import styles from "./style.module.css";
import type { ChatHistory } from "./types";

export function AIChatForm() {
	const abortController = useRef(new AbortController());
	const messagesRef = useRef<HTMLDivElement>(null);
	const [isPending, startTransition] = useTransition();
	const [history, setHistory] = useState<ChatHistory[]>([]);
	const [currentMessage, setCurrentMessage] = useState<ChatHistory | null>(
		null,
	);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(e.currentTarget);
		const message = formData.get("message") as string;
		const model = formData.get("model") as string;
		const lastMessage = history[history.length - 1];

		const newMessage = { message, model, response: "" };

		if (message) {
			setCurrentMessage(newMessage);
			startTransition(async () => {
				e.preventDefault();
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

				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						break;
					}
					result += new TextDecoder().decode(value);
					setCurrentMessage({
						message,
						model,
						response: result,
					});
				}
				if (currentMessage) {
					setHistory((prev) => {
						return [...prev, currentMessage];
					});
					setCurrentMessage(null);
				}
				(e.target as HTMLFormElement).reset();
			});
		}
		return false;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: We want to scroll to the bottom when the messages change
	useEffect(() => {
		messagesRef.current?.scrollTo({
			top: messagesRef.current.scrollHeight,
		});
	}, [currentMessage, history]);
	return (
		<section className={styles.container}>
			<h1>AI Chat</h1>
			<section className={styles.chat}>
				<form
					onSubmit={handleSubmit}
					className={styles.form}
					suppressHydrationWarning
				>
					<div className={styles.modelSelector}>
						<select
							name="model"
							id="model"
							defaultValue={"gemini-2.0-flash-lite"}
						>
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
					<section className={styles.messages} ref={messagesRef}>
						{history.map((session, idx) => (
							<AIChatResponse
								key={`history-${idx}-${session.message}`}
								idx={idx + 1}
								data={session}
							/>
						))}
						{currentMessage && (
							<AIChatResponse
								withLoader
								idx={history.length + 1}
								key={`new-message-${currentMessage.message}`}
								data={currentMessage}
							/>
						)}
					</section>

					<fieldset
						className={styles.formControls}
						disabled={isPending}
						suppressHydrationWarning
					>
						<input name="message" />
						<button type="submit">{isPending ? "Loading..." : "Send"}</button>
					</fieldset>
				</form>
			</section>
		</section>
	);
}
