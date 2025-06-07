"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import AIChatResponse from "./response";
import styles from "./style.module.css";
import type { ChatHistory } from "./types";

export function AIChatForm({ models }: { models: string[] }) {
	const abortController = useRef(new AbortController());
	const inputRef = useRef<HTMLInputElement>(null);
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

		const newMessage = { message, model, response: "" };

		if (message) {
			if (currentMessage) {
				setHistory((prev) => {
					return [...prev, currentMessage];
				});
			}
			setCurrentMessage(newMessage);
			startTransition(async () => {
				e.preventDefault();
				abortController.current.abort();
				abortController.current = new AbortController();
				const response = await fetch("/api/chat", {
					method: "POST",
					body: JSON.stringify({
						messages: [
							...history.flatMap((message) => [
								{
									role: "user",
									content: message.message,
								},
								{
									role: "assistant",
									content: message.response,
								},
							]),
							{
								role: "user",
								content: message,
							},
						],
						model,
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

				(e.target as HTMLFormElement).reset();
				setTimeout(() => {
					inputRef.current?.focus();
				}, 10);
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
							{models.map((model) => (
								<option key={model} value={model}>
									{model}
								</option>
							))}
						</select>
						<button
							type="button"
							disabled={isPending}
							onClick={() => {
								setHistory([]);
								setCurrentMessage(null);
							}}
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
								withLoader={isPending}
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
						<input name="message" ref={inputRef} />
						<button type="submit">{isPending ? "Loading..." : "Send"}</button>
					</fieldset>
				</form>
			</section>
		</section>
	);
}
