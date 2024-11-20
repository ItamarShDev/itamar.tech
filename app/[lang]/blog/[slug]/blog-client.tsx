"use client";

import { HeadlineSidebar } from "app/[lang]/blog/[slug]/blog/headline-sidebar";
import EmailMeFooter from "components/email-footer";
import { useEffect, useRef, useState } from "react";
import styles from "./blog-client.module.css";

interface BlogClientProps {
	data: Record<string, string>;
	html: string;
	translations: {
		footerTitle: string;
	};
	emailTranslations: {
		title: string;
		text: string;
		email: string;
		message: string;
		or: string;
		submit: string;
		firstName: string;
		lastName: string;
		sending: string;
		thankYou: string;
	};
}

export default function BlogClient({
	data,
	html,
	translations,
	emailTranslations,
}: BlogClientProps) {
	const [articleDOM, setArticleDOM] = useState(null);
	const articleRef = useRef(null);

	const emailTitle = `Re: ${encodeURI(data?.title)}`;

	// biome-ignore lint/correctness/useExhaustiveDependencies: Update ref only when html changes
	useEffect(() => {
		setArticleDOM(articleRef.current);
	}, [html]);

	return (
		<>
			<HeadlineSidebar article={articleDOM} />
			<div className={`${styles.blogWrapper} blog-wrapper`} id="blog-footer">
				<h1 className={`${styles.postTitle} post-title`}>{data?.title}</h1>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: We need this to render html */}
				<article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />
				<EmailMeFooter
					title={emailTitle}
					text={translations.footerTitle}
					translations={emailTranslations}
				/>
			</div>
		</>
	);
}
