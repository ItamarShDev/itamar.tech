import { ThemeContext } from "lib/hooks";
import { useContext } from "react";
import Link from "next/link";

export default function LinkCard({
    route,
    title,
    subTitle,
    routeRef = null,
    date = null,
    children = null,
}) {
    const { theme } = useContext(ThemeContext);
    return (
        <Link href={routeRef || route} as={route} passHref>
            <dl>
                <dt>{title}</dt>
                <dd>
                    <p>{subTitle}</p>
                    <span>{date}</span>
                </dd>
                {children}

                <style jsx>{`
                    dl {
                        border-radius: 2rem;
                        display: block;
                        margin: 1rem;
                        padding: 2rem;
                        text-align: left;
                        flex-grow: 1;
                        text-decoration: none;
                        cursor: pointer;
                    }
                    dl:hover {
                        outline: 1px solid ${theme.decorations};
                    }

                    dt {
                        margin: 0 0 1em 0;
                        font-size: 3rem;
                        font-weight: 500;
                        color: ${theme.headerText};
                    }
                    dd {
                        color: ${theme.subText};
                        margin: 0 10px;
                        font-size: 1.5em;
                        line-height: 1.5;
                    }
                `}</style>
                <style jsx>{`
                    @media only screen and (max-width: 968px) {
                        dl {
                            text-align: center;
                        }
                    }
                    @media (hover: hover) {
                        dl:hover a {
                            transition: all 0.2s linear;
                            text-decoration: underline double 1px
                                ${theme.headerText};
                        }
                    }
                `}</style>
            </dl>
        </Link>
    );
}
