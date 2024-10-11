export interface EmailTemplateProps {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
	title: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = (
	props,
) => (
	<div>
		<h1>From: {props.email}</h1>
		<div>
			{props.firstName} {props.lastName} {props.email}
		</div>
		<p>{props.message}</p>
	</div>
);
export const ValidationEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = (
	props,
) => (
	<div>
		<h1>
			Hi {props.firstName} {props.lastName}
		</h1>
		<p>Thank you for your message, we will get back to you soon.</p>
		<div>
			<strong>Email:</strong> {props.email}
			<strong>Message:</strong>
		</div>
		<code>{props.message}</code>
	</div>
);
