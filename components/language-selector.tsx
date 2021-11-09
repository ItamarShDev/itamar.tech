import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function LanguageSelector() {
    const { locales, locale, asPath } = useRouter();

    const [showSelection, setShowSelection] = useState(false);
    const restLocales = locales.filter((l) => l !== locale);
    return (
        <nav>
            <button onClick={() => setShowSelection(!showSelection)}>
                {locale}
            </button>
            {showSelection && (
                <div className="container">
                    <ul>
                        {restLocales.map((_locale) => {
                            if (_locale === "default") return null;
                            return (
                                <li
                                    key={_locale}
                                    className={
                                        _locale === locale ? "active" : ""
                                    }
                                    onClick={() => setShowSelection(false)}
                                >
                                    <Link href={`${asPath}`} locale={_locale}>
                                        {_locale}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            <style jsx>{`
                nav {
                    font-size: 1.5rem;
                }
                button {
                    all: unset;
                    height: 100%;
                }

                .container {
                    position: absolute;
                    top: 100%;
                    width: max-content;
                }

                ul {
                    all: unset;
                    margin-block-start: 1rem;
                    cursor: default;
                    list-style: none;
                    background-color: var(--colors-modalBg);
                    border: 1px solid var(--colors-decorations);
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                li {
                    padding: 1rem 2rem;
                }
            `}</style>
        </nav>
    );
}
