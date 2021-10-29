import { useScreenSize } from "lib/hooks";
import { useThemeContext } from "lib/hooks/useTheme";
import { useEffect, useState } from "react";

interface quoteData {
    role: string;
    profile: string;
    quotes: string[];
}
interface quotes {
    [name: string]: quoteData;
}
interface quote {
    role?: string;
    profile?: string;
    quote: string;
}
interface Props {
    quotes: quotes;
}
function extractQuotesByPerson(quotes: quotes): quote[] {
    let quotesResult: quote[] = [];
    for (let userQuotes in quotes) {
        const quoteList = quotes[userQuotes].quotes.map((quote) => ({
            role: quotes[userQuotes].role,
            profile: quotes[userQuotes].profile,
            quote: quote,
        }));

        quotesResult = [...quotesResult, ...quoteList];
    }
    return quotesResult;
}
export default function FloatingQuotes(props: Props) {
    const quotes = extractQuotesByPerson(props.quotes);
    const _randomNumber = Math.floor(Math.random() * 100);
    const [randomNumber, setRandomNumber] = useState(_randomNumber);
    const { theme } = useThemeContext();
    useEffect(() => {
        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            setRandomNumber(randomNumber);
        }, 15000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const idx = randomNumber % quotes.length;

    return (
        <div>
            <p>{quotes[idx].quote}</p>
            <style jsx>{`
                div {
                    padding: 2rem;
                }
                p {
                    color: ${theme.subText};
                    word-break: normal;
                    font-size: 1.5rem;
                    font-style: italic;
                    animation: fadeInAndOut 15s linear infinite;
                    line-height: 2rem;
                    font-family: cursive;
                    position: relative;
                    padding-inline-start: 3rem;
                }

                p:before {
                    content: "„";
                    position: absolute;
                    font-size: 4em;
                    left: 0;
                    top: 0;
                    color: grey;
                    line-height: 0;
                }

                @keyframes fadeInAndOut {
                    0% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }

                    80% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
