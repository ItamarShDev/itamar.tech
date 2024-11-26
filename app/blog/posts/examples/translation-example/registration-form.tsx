"use client";

import { useState } from "react";
import { useTranslation } from ".";
import styles from "./registration-form.module.css";

export function RegistrationForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const { t, setLocale, locale } = useTranslation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsLoading(false);
		setHasError(true);
	};

	return (
		<div
			className={styles.registrationForm}
			data-locale={locale}
			dir={locale === "he" ? "rtl" : "ltr"}
		>
			<h1 className={styles.title}>{t("common.welcome")}</h1>
			<p>{t("common.description")}</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label className={styles.label}>{t("forms.labels.email")}</label>
					{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
					<input
						type="email"
						className={styles.input}
						placeholder={t("forms.placeholders.email")}
						aria-label={t("forms.aria.email")}
					></input>
					{hasError && (
						<span className={styles.errorMessage}>
							{t("forms.errors.required")}
						</span>
					)}
				</div>

				<p className={styles.validationText}>
					{t("forms.validation.password.length", { length: "8" })}
				</p>

				<button
					type="submit"
					className={styles.submitButton}
					disabled={isLoading}
				>
					{isLoading ? t("common.loading") : t("forms.buttons.submit")}
				</button>
			</form>

			<div className={styles.languageSwitcher} dir="ltr">
				<div className={styles.languageSwitchContainer}>
					<input
						type="radio"
						id="en-locale"
						name="locale"
						value="en"
						checked={locale === "en"}
						onChange={() => setLocale("en")}
						className={styles.localeRadio}
					/>
					<label
						htmlFor="en-locale"
						className={`${styles.localeLabel} ${locale === "en" ? styles.localeLabelActive : ""}`}
					>
						{t("languages.english")}
					</label>

					<input
						type="radio"
						id="he-locale"
						name="locale"
						value="he"
						checked={locale === "he"}
						onChange={() => setLocale("he")}
						className={styles.localeRadio}
					/>
					<label
						htmlFor="he-locale"
						className={`${styles.localeLabel} ${locale === "he" ? styles.localeLabelActive : ""}`}
					>
						{t("languages.hebrew")}
					</label>
				</div>
			</div>
		</div>
	);
}
