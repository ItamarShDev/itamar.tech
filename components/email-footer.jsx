import { useContext } from "react";

const EmailMeFooter = ({ text, title }) => {
    const mailTo = `mailto:itamarsharifytech@gmail.com?subject=${title}`;
    return (
        <address>
            <div>
                {text}
                <a href={mailTo}>here</a>
            </div>
            <style jsx>{`
                address {
                    color: var(--colors-paragraph);
                    font-size: 1.5rem;
                    font-style: italic;
                    padding-block: 2rem;
                    border-top: 1px dotted var(--colors-text);
                }
                a {
                    margin-inline-start: 5px;
                }
            `}</style>
        </address>
    );
};
export default EmailMeFooter;
