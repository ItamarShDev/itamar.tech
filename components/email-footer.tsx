"use client";

import { sendEMail } from "actions/email/helpers";
import { useActionState, useRef, useState } from "react";
import styles from "./EmailFooter.module.css";

interface EmailFooterProps {
	title: string;
	text: string;
	translations: {
		title: string;
		text: string;
		email: string;
		message: string;
		or: string;
		submit: string;
		firstName: string;
		lastName: string;
		sending: string;
		thankYou: string;
	};
}

const EmailFooter = ({ title, text, translations }: EmailFooterProps) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [createEmail, setCreateEmail] = useState(false);
	const [state, formAction, isPending] = useActionState(sendEMail, null);
	return (
		<footer className={styles.emailFooter}>
			<p>{text}</p>
			<div className={styles.actions}>
				<a href={`mailto:itamarsharify@gmail.com?subject=${title}`}>
					{translations.title}
				</a>
				{translations.or}
				<button
					className={styles.sendMessageButton}
					onClick={() => setCreateEmail(true)}
					type="button"
				>
					{translations.text}
				</button>
			</div>
			{createEmail && (
				<form className={styles.form} action={formAction} ref={formRef}>
					<div className={styles.details}>
						<input type="text" name="title" hidden defaultValue={title} />
						<input
							type="text"
							name="firstName"
							placeholder={translations.firstName}
							required
						/>
						<input
							type="text"
							name="lastName"
							placeholder={translations.lastName}
							required
						/>
					</div>
					<input
						type="email"
						name="email"
						placeholder={translations.email}
						required
					/>
					<textarea
						name="message"
						placeholder={translations.message}
						required
					/>
					<button type="submit" className={styles.submit}>
						{isPending ? translations.sending : translations.submit}
					</button>
				</form>
			)}
			{state && "message" in state && (
				<p className={styles.sentText}>{state.message}</p>
			)}
		</footer>
	);
};

export default EmailFooter;
