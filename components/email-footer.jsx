import { ThemeContext } from "../lib/hooks";
import { useContext } from "react";

const EmailMeFooter = ({ text, title }) => {
    const { theme } = useContext(ThemeContext);
    const mailTo = `mailto:itamarsharifytech@gmail.com?subject=${title}`;
    return (
        <address>
            <div>
                {text}
                <a href={mailTo}>here</a>
            </div>
            <style jsx>{`
                address {
                    color: ${theme.paragraph};
                    font-size: 1.5rem;
                    font-style: italic;
                    padding-block: 2rem;
                    border-top: 1px dotted ${theme.text};
                }
                a {
                    margin-inline-start: 5px;
                }
            `}</style>
        </address>
    );
};
export default EmailMeFooter;
