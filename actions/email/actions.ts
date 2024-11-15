import type { EmailTemplateProps } from "components/email";
import nodemailer from "nodemailer";
export function sendThankYouMail(payload: EmailTemplateProps) {
	const mail = "itamarsharify@gmail.com";
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: mail,
			pass: process.env.GMAIL,
		},
	});

	const mailOptions = {
		to: payload.email,
		from: mail,
		subject: "Thank you for reaching out",
		text: "Thank you for your message, I will get back to you soon.",
	};

	transporter.sendMail(mailOptions, (error) => {
		if (error) {
			throw new Error(error);
		}
	});
}
export function sendMail(payload: EmailTemplateProps) {
	const mail = "itamarsharify@gmail.com";
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: mail,
			pass: process.env.GMAIL,
		},
	});

	const mailOptions = {
		to: mail,
		from: payload.email,
		subject: payload.title,
		text: payload.message,
	};

	transporter.sendMail(mailOptions, (error) => {
		if (error) {
			throw new Error(error);
		}
	});
}
