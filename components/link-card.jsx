import Link from "next/link";

export default function LinkCard({
    route,
    title,
    subTitle,
    routeRef = null,
    date = null,
    children = null,
}) {
    return (
        <Link href={routeRef || route} as={route} passHref>
            <dl>
                <dt>{title}</dt>
                <dd>
                    <span>{subTitle}</span>
                    <span>{date}</span>
                </dd>
                {children}

                <style jsx>{`
                    dl {
                        border-radius: 2rem;
                        display: block;
                        margin: 1rem;
                        padding: 2rem;
                        text-align: start;
                        flex-grow: 1;
                        text-decoration: none;
                        cursor: pointer;
                    }
                    dl:hover > dt {
                        text-decoration: underline 1px solid
                            var(--colors-decorations);
                    }

                    dt {
                        margin: 0;
                        font-size: 3rem;
                        font-weight: 500;
                        color: var(--colors-headerText);
                    }
                    dd {
                        color: var(--colors-subText);
                        margin: 0 5px;
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
                                var(--colors-headerText);
                        }
                    }
                `}</style>
            </dl>
        </Link>
    );
}
