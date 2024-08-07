import EmailMeFooter from "components/email-footer";
import { useTelegramComments } from "lib/hooks";
import { getAllPostIds, getPostData } from "lib/posts";
import renderMarkdown from "lib/render-markdown";
import { useEffect, useRef, useState } from "react";
import { HeadlineSidebar } from "./../../components/blog/headline-sidebar";

export default function Blog({ data, html }) {
	const [articleDOM, setArticleDOM] = useState(null);
	const articleRef = useRef(null);
	useTelegramComments("blog-footer");
	const emailTitle = `Re: ${encodeURI(data?.title)}`;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setArticleDOM(articleRef.current);
	}, [html]);
	if (!data) return null;
	return (
		<div id="blog-post">
			<HeadlineSidebar article={articleDOM} />
			<div className="blog-wrapper" id="blog-footer">
				<h1 className="post-title">{data?.title}</h1>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				<article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />
				<EmailMeFooter title={emailTitle} text="Having thoughts? email me" />
			</div>
			<style jsx>{`
                #blog-post {
                    display: flex;
                    justify-content: center;
                    font-size: 20px;
                    width: inherit;
                }
                .blog-wrapper {
                    width: max-content;
                    max-width: 80%;
                    padding: 3rem;
                }
                h1.post-title {
                    padding-bottom: 1em;
                    color: var(--colors-headerText);
                    font-weight: 200;
                }
                @media only screen and (max-width: 968px) {
                    #blog-post {
                        font-size: 16px;
                        display: block;
                    }
                    .blog-wrapper {
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0;
                    }
                }
            `}</style>
			<style jsx global>{`
                p {
                    filter: brightness(150%);
                    margin: 0 0 0 0;
                }
                h1 {
                    font-family: "Codystar", Arial, Helvetica, sans-serif;
                }
                h2 {
                    font-size: 2em;
                    margin-block-end: 0.3em;
                }
                h3 {
                    font-size: 1.8em;
                }
                h4 {
                    font-size: 1.5em;
                }
                h2,
                h3,
                h4 {
                    margin-block-end: 0.3em;
                    font-family: "Alegreya Sans SC", sans-serif;
                }
                h1,
                h2,
                h3,
                h4 {
                    scroll-margin-top: 7.5rem;
                }
                h1 > a,
                h2 > a,
                h4 > a,
                h3 > a {
                    filter: brightness(225%);
                    font-weight: 300;
                    text-decoration: none;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 10px;
                }
                code {
                    background-color: var(--colors-inputs);
                    font-size: 0.75em;
                    padding: 3px;
                }
                article {
                    font-weight: 400;
                    font-size: 1em;
                    letter-spacing: 0.5px;
                    color: var(--colors-paragraph);
                    font-family: "Quicksand", sans-serif;
                }
                article > p {
                    line-height: 2em;
                }

                article > pre {
                    font-size: 0.8em;
                    padding: 1em;
                    overflow-y: auto;
                    overflow-x: auto;
                    border-left: 3px var(--colors-decorations) solid;
                    font-family: "Fira Code", monospace;
                }

                article blockquote:before {
                    content: "„";
                    position: absolute;
                    font-size: 10em;
                    left: 0;
                    top: 0;
                    color: grey;
                    line-height: 0;
                }
                article blockquote {
                    position: relative;
                    font-family: "Helvetica", serif;
                    padding: 2.5em 1em 1em 5em;
                    margin: 0;
                    font-style: italic;
                    font-size: 0.8em;
                    font-weight: 100;
                    line-height: 1.4em;
                }
                blockquote p {
                    margin: 0;
                }
                article ul {
                    font-family: "Roboto", sans-serif;
                    font-size: 0.7em;
                    list-style-type: square;
                }
                ul li {
                    margin: 0.8em auto;
                }
                @media only screen and (max-width: 968px) {
                    article {
                        font-weight: 600;
                    }
                    article blockquote {
                        font-size: 1em;
                        font-weight: 300;
                    }
                    h1.post-title,
                    article > :not(pre, iframe) {
                        max-width: 80vw;
                        margin-inline: auto;
                    }
                    article blockquote::before {
                        line-height: 0.5em;
                    }
                }
                @media only screen and (max-width: 640px) {
                    article pre {
                        font-size: 1em;
                        line-height: 2em;
                        padding: 0.5em;
                    }
                }
            `}</style>
		</div>
	);
}

export async function getStaticProps({ params, locale }) {
	const { data, content } = getPostData(params.slug, locale);
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
