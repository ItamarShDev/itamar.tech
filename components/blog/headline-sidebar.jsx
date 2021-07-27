import { useScreenSize } from "lib/hooks";

function generateLinkMarkup($contentElement) {
    const headings = [...$contentElement.querySelectorAll("h1, h2")];
    const parsedHeadings = headings.map((heading) => {
        return {
            title: heading.innerText,
            depth: heading.nodeName.replace(/\D/g, ""),
            id: heading.getAttribute("id"),
        };
    });
    return parsedHeadings;
}

function HeaderTitle({ header }) {
    const AnchorLink = <a href={`#${header.id}`}>{header.title}</a>;
    let title = <dt>{AnchorLink}</dt>;
    if (header.depth > 1) {
        title = <dd>{AnchorLink}</dd>;
    }
    return title;
}

export function HeadlineSidebar({ article }) {
    const { isMobile } = useScreenSize();
    if (isMobile || !article) return <></>;
    const headers = generateLinkMarkup(article);
    const headings = headers.map((header) => (
        <HeaderTitle key={header.id} header={header} />
    ));
    return (
        <aside>
            <div>
                <h6>Headlines</h6>
                <dl>{headings}</dl>
                <span className="line"></span>
            </div>
            <style jsx>{`
                div {
                    position: sticky;
                    scroll-margin-top: 7rem;
                    top: 9rem;
                    left: 0;
                    width: 20rem;
                    margin-inline: 5rem;
                    padding-inline: 5px;
                }
                .line {
                    position: absolute;
                    width: 1px;
                    height: 90vh;
                    top: 0;
                    left: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                }
                .line::after {
                    content: "";
                    display: block;
                    position: absolute;
                    height: 15vh;
                    width: 100%;
                    top: -50%;
                    left: 0;
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0) 0%,
                        #ffffff 75%,
                        #ffffff 100%
                    );
                    animation: drop 7s 0s infinite;
                    animation-fill-mode: forwards;
                    animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
                }
                @keyframes drop {
                    from {
                        top: -50%;
                    }

                    to {
                        top: 110%;
                    }
                }
            `}</style>
            <style jsx global>{`
                dt {
                    font-size: 1.4rem;
                }
                dd {
                    font-size: 1.2rem;
                }
                dd,
                dt {
                    margin-block: 1rem;
                }
                dd a,
                dt a {
                    text-decoration: none;
                }
                dd a:hover,
                dt a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </aside>
    );
}
