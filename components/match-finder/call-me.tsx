import { useTelegramComments } from "lib/hooks";
import EmailMeFooter from "../email-footer";
export default function CallMe() {
	useTelegramComments("call-me");
	return (
		<div id="call-me">
			<EmailMeFooter
				title="We are a match! let's talk."
				text="Offer me a job"
			/>
		</div>
	);
}
