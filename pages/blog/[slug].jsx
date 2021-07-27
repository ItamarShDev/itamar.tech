import { HeadlineSidebar } from "./../../components/blog/headline-sidebar";
import { getAllPostIds, getPostData } from "lib/posts";
import renderMarkdown from "lib/render-markdown";
import { ThemeContext, useTelegramComments } from "lib/hooks";
import { useContext, useEffect, useRef, useState } from "react";
import EmailMeFooter from "components/email-footer";

export default function Blog({ data, html }) {
    const [articleDOM, setArticleDOM] = useState(null);
    if (!data) return null;
    const { theme } = useContext(ThemeContext);
    const articleRef = useRef(null);
    useTelegramComments("blog-post");
    const emailTitle = `Re: ${encodeURI(data.title)}`;
    useEffect(() => {
        setArticleDOM(articleRef.current);
    }, [articleRef]);
    return (
        <div id="blog-post">
            <HeadlineSidebar article={articleDOM} />
            <div className="blog-wrapper">
                <h1 className="post-title">{data.title}</h1>
                <article
                    ref={articleRef}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
                <EmailMeFooter
                    title={emailTitle}
                    text="Having thoughts? email me"
                />
            </div>
            <style jsx>{`
                #blog-post {
                    display: flex;
                    justify-content: center;
                }
                .blog-wrapper {
                    max-width: 100rem;
                    width: 100%;
                    margin: 0 auto;
                }
                h1.post-title {
                    padding-bottom: 2rem;
                    color: ${theme.headerText};
                    font-weight: 200;
                }
            `}</style>
            <style jsx global>{`
                p {
                    filter: brightness(150%);
                    margin: 0 0 0 0;
                }
                h1,
                h2,
                h3,
                h4 {
                    scroll-margin-top: 7.5rem;
                }
                h1 a,
                h2 a,
                h3 a {
                    filter: brightness(225%);
                    font-weight: 300;
                    text-decoration: none;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 10px;
                }
                article {
                    font-weight: 300;
                    font-size: 1.8rem;
                    line-height: 3rem;
                    letter-spacing: 0.5px;
                    color: ${theme.paragraph};
                    font-family: "Roboto", sans-serif;
                }

                article > pre {
                    padding: 1rem;
                    overflow-y: auto;
                    overflow-x: auto;
                    border-left: 3px ${theme.decorations} solid;
                    font-family: "Fira Code", monospace;
                }
                @media only screen and (max-width: 968px) {
                    h1.post-title,
                    article > :not(pre, iframe) {
                        max-width: 80vw;
                        margin-inline: auto;
                    }
                }
                article blockquote:before {
                    content: "„";
                    position: absolute;
                    font-size: 10rem;
                    left: 0;
                    top: 0;
                    color: grey;
                }
                article blockquote {
                    position: relative;
                    font-family: "Helvetica", serif;
                    padding: 1rem 1rem 1rem 5rem;
                    margin: 0;
                    font-style: italic;
                    font-size: 1.5rem;
                    font-weight: 100;
                }
                blockquote p {
                    margin: 0;
                }
                article ul {
                    list-style-type: square;
                }
                ul li {
                    margin: 0.8rem auto;
                }
                @media (max-width: 640px) {
                    article pre {
                        font-size: 1rem;
                        line-height: 2rem;
                        padding: 0.5rem;
                    }
                }
            `}</style>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const { data, content } = getPostData(params.slug);
    const html = renderMarkdown(content);
    return {
        props: {
            data,
            title: "Blog",
            html: html,
            headerTitle: "Blog",
            width: "100vw",
            maxWidth: "100vw",
        },
    };
}
export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: true,
    };
}
