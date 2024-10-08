import type { EmailTemplateProps } from "components/email";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
function sendThankYouMail(payload: EmailTemplateProps) {
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
function sendMail(payload: EmailTemplateProps) {
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
		subject: "New Job Offer",
		text: payload.message,
	};

	transporter.sendMail(mailOptions, (error) => {
		if (error) {
			throw new Error(error);
		}
	});
}
export default async function endpoint(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const payload = JSON.parse(req.body) as EmailTemplateProps;
	try {
		sendMail(payload);
		sendThankYouMail(payload);
	} catch (error) {
		return res.status(400).json(error);
	}

	res.status(200).json({ message: "email sent" });
}
