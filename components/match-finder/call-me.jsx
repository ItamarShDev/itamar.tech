import EmailMeFooter from "../email-footer";
import { useTelegramComments } from "lib/hooks";
export default function CallMe({ percentage }) {
    useTelegramComments("call-me");
    return (
        <div id="call-me">
            {percentage >= 90 && (
                <EmailMeFooter
                    title="We are a match! let's talk."
                    text="Offer me a job"
                />
            )}
        </div>
    );
    return null;
}
