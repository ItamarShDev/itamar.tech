"use server";

import type { EmailTemplateProps } from "components/email";
import { getTranslationsCache } from "lib/server-cache";
import { sendMail, sendThankYouMail } from "./actions";
type Response =
	| { message: string }
	| { error: string }
	| { error: string; message: string };
export async function sendEMail(_: Response, formData: FormData) {
	const translations = await getTranslationsCache("email");
	const value: EmailTemplateProps = {
		title: formData.get("title") as string,
		firstName: formData.get("firstName") as string,
		lastName: formData.get("lastName") as string,
		email: formData.get("email") as string,
		message: formData.get("message") as string,
	};

	const settled = await Promise.allSettled([
		sendThankYouMail(value),
		sendMail(value),
	]);

	const errors = settled.filter((item) => item.status === "rejected");
	if (errors.length > 0) {
		return { error: errors[0].reason };
	}
	return { message: translations.thankYou };
}
