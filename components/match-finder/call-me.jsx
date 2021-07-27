import EmailMeFooter from "../email-footer";
import { useTelegramComments } from "lib/hooks";
export default function CallMe({ percentage }) {
    if (percentage >= 90) {
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
    return null;
}
