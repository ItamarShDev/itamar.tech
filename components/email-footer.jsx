import { ThemeContext } from "../lib/hooks";
import { useContext } from "react";

const EmailMeFooter = ({ text, title }) => {
    const { theme } = useContext(ThemeContext);
    const mailTo = `"mailto:itamarsharifytech@gmail.com?subject=${title}`;
    return (
        <address>
            <p>
                {text}
                <a href={mailTo}>here</a>
            </p>
            <style jsx>{`
                address {
                    color: ${theme.paragraph};
                    font-size: 1.5rem;
                    font-style: italic;
                    padding-block: 1rem;
                    padding-inline-start: 1rem;
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
