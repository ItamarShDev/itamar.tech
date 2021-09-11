import { useScreenSize } from "lib/hooks";
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
    const { isMobile } = useScreenSize();
    useEffect(() => {
        if (isMobile) return;
        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            setRandomNumber(randomNumber);
        }, 13000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const idx = randomNumber % quotes.length;
    if (isMobile) return null;
    return (
        <>
            <div>{quotes[idx].quote}</div>
            <style jsx>{`
                div {
                    position: fixed;
                    max-width: 200px;
                    word-break: normal
                    font-size: 1.3em;
                    font-style: italic;
                    left: 10px;
                    animation: fadeInAndOut 13s linear infinite;
                }
                @keyframes fadeInAndOut {
                    0% {
                        top: 100vh;
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        top: 30vh;
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
}
