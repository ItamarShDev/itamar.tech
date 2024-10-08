import { useTranslation } from "lib/hooks/useTranslation";
import { type FormEvent, useRef, useState } from "react";
import styles from "./EmailFooter.module.css";

const EmailFooter = ({ title, text }) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [sentText, setSentText] = useState();
	const translations = useTranslation({
		en: {
			title: "Send me an email",
			text: "Send me a message or a proposal",
			email: "Email",
			message: "Message",
			or: "OR",
			submit: "Send",
			firstName: "First Name",
			lastName: "Last Name",
			sending: "Sending...",
			thankYou: "Thank you for your message, I will get back to you soon.",
		},
		he: {
			title: "שלחו לי אימייל",
			text: "שלחו לי הודעה",
			email: "אימייל",
			message: "הודעה",
			or: "או",
			submit: "שלח",
			firstName: "שם פרטי",
			lastName: "שם משפחה",
			sending: "שולח...",
			thankYou: "תודה על ההודעה, אגיב בהקדם",
		},
	});
	const [createEmail, setCreateEmail] = useState(false);
	const [isLoading, setLoading] = useState(false);
	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const value = {};
		for (const entry of formData.entries()) {
			value[entry[0]] = entry[1];
		}
		try {
			setLoading(true);
			const response = await fetch("/api/email", {
				method: "POST",
				body: JSON.stringify(value),
			});

			const data = await response.json();
			if (data.error) {
				console.log(data.error);
			}
			setSentText(translations.thankYou);
		} catch (error) {
			console.log(error);
		} finally {
			setCreateEmail(false);
			formRef.current?.reset();
			setLoading(false);
		}
	}
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
				<form className={styles.form} onSubmit={onSubmit} ref={formRef}>
					<div className={styles.details}>
						<input
							type="text"
							name="firstName"
							placeholder={translations.firstName}
						/>
						<input
							type="text"
							name="lastName"
							placeholder={translations.lastName}
						/>
					</div>
					<input type="text" name="email" placeholder={translations.email} />
					<textarea name="message" placeholder={translations.message} />
					<button type="submit" className={styles.submit}>
						{isLoading ? translations.sending : translations.submit}
					</button>
				</form>
			)}
			{sentText && <p className={styles.sentText}>{sentText}</p>}
		</footer>
	);
};

export default EmailFooter;
