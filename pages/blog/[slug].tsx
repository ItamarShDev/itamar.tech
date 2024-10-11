import EmailMeFooter from "components/email-footer";
import useTelegramComments from "lib/hooks/useTelegramComments";
import { useTranslation } from "lib/hooks/useTranslation";
import { getAllPostIds, getPostData } from "lib/posts";
import renderMarkdown from "lib/render-markdown";
import { useEffect, useRef, useState } from "react";
import { HeadlineSidebar } from "../../components/blog/headline-sidebar";
import styles from "./Blog.module.css";
export default function Blog({ data, html }) {
	const [articleDOM, setArticleDOM] = useState(null);
	const articleRef = useRef(null);
	useTelegramComments("blog-footer");
	const emailTitle = `Re: ${encodeURI(data?.title)}`;
	const translations = useTranslation({
		en: {
			footerTitle: "Having thoughts? email me",
		},
		he: {
			footerTitle: "מחשבות? שלחו לי אימייל",
		},
	});
	// biome-ignore lint/correctness/useExhaustiveDependencies: Update ref only when html changes
	useEffect(() => {
		setArticleDOM(articleRef.current);
	}, [html]);
	if (!data) return null;
	return (
		<div id="blog-post" className={styles.blogPost}>
			<HeadlineSidebar article={articleDOM} />
			<div className={`${styles.blogWrapper} blog-wrapper`} id="blog-footer">
				<h1 className={`${styles.postTitle} post-title`}>{data?.title}</h1>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: We need this to render html */}
				<article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />
				<EmailMeFooter title={emailTitle} text="Having thoughts? email me" />
			</div>
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
	const paths = getAllPostIds();
	return {
		paths,
		fallback: true,
	};
}
