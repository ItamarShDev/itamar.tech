import { SocialRefs } from "components";
import RandomQuotes from "components/floating-quotes";
import { useScreenSize } from "lib/hooks";
import { useTranslation } from "lib/hooks/useTranslation";
import React from "react";
const translations = {
    en: {
        title: "Itamar.",
        subtitle: "Software Engineer",
    },
    he: { title: "איתמר.", subtitle: "מהנדס תוכנה" },
};
type Transtlations = {
    title: string;
    subtitle: string;
};

function AboutMe({ quotes }) {
    const texts: Transtlations = useTranslation(translations);
    const { isMobile } = useScreenSize();
    return (
        <div className="about-me">
            <div className="summary">
                <h1>{texts.title}</h1>
                <h2>{texts.subtitle}</h2>

                <SocialRefs />
                {!isMobile && <RandomQuotes quotes={quotes} />}
            </div>
            <style jsx>{`
                .about-me {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;
                    padding: 1rem;
                    color: var(--colors-text);
                }
                h2 {
                    font-family: "Codystar", Arial, Helvetica, sans-serif;
                }
                a {
                    font-size: 0.7em;
                }
                a:hover,
                a:focus,
                a:active {
                    text-decoration: underline;
                }

                @media screen and (max-width: 768px) {
                    .about-me {
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                    }
                }

                h4 {
                    letter-spacing: 0.1em;
                    margin-block-end: 0;
                }
            `}</style>
        </div>
    );
}

export default AboutMe;
