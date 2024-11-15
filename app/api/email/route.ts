import { sendMail, sendThankYouMail } from "actions/email/actions";
import type { EmailTemplateProps } from "components/email";

export async function POST(request: Request) {
	const payload = (await request.json()) as EmailTemplateProps;
	try {
		sendMail(payload);
		sendThankYouMail(payload);
	} catch (error) {
		return Response.json(error, { status: 400 });
	}

	return Response.json({ message: "email sent" }, { status: 200 });
}
