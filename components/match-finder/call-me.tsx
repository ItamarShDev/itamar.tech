"use client";
import { useTranslation } from "translations/hooks";
import EmailMeFooter from "../email-footer";

export default function CallMe() {
	const { translations: offerMeJobText } = useTranslation("offer_me_job");
	const { translations: emailTranslations } = useTranslation("email");

	if (!emailTranslations) return null;
	if (!offerMeJobText?.text || !offerMeJobText?.title) return null;
	return (
		<div id="call-me">
			<EmailMeFooter
				title={offerMeJobText.title}
				text={offerMeJobText.text}
				translations={emailTranslations}
			/>
		</div>
	);
}
