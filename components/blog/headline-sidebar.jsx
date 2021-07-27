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
                <h6>Heading</h6>
                <dl>{headings}</dl>
            </div>
            <style jsx>{`
                div {
                    position: sticky;
                    top: 0;
                    left: 0;
                    width: 20rem;
                    margin: 5rem;
                    padding: 5px;
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
