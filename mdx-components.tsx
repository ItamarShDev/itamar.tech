import { RegistrationForm } from "app/blog/posts/examples/translation-example/registration-form";
import { Code } from "bright";
import { bodyFontClass } from "lib/fonts";
import { getCurrentTheme } from "lib/headers";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./mdx-components.module.css";

function Table({ data }) {
	const headers = data.headers.map((header) => <th key={header}>{header}</th>);
	const rows = data.rows.map((row) => (
		<tr key={row}>
			{row.map((cell) => (
				<td key={cell}>{cell}</td>
			))}
		</tr>
	));

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function CustomLink(props) {
	const href = props.href;

	if (href.startsWith("/")) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}

	if (href.startsWith("#")) {
		return <a {...props} />;
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
	return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

export function CodeComponent(theme) {
	// Create a more robust theme mapping
	const themeMap: Record<string, typeof Code.theme> = {
		dark: "dracula",
		light: "light-plus",
		default: "dark-plus",
		monokai: "monokai",
		cobalt2: "solarized-dark",
		opus: "solarized-dark",
	};

	return function Component({ children, ...props }) {
		if (!props.className) {
			return (
				<code {...props} className={styles.inlineCode}>
					{children}
				</code>
			);
		}

		// Use the theme mapping with a fallback to default
		const codeTheme = themeMap[theme] || themeMap.default;

		return (
			<Code
				className={`${styles.pre} ${bodyFontClass}`}
				lineNumbers
				theme={codeTheme}
				lightThemeSelector='[data-theme="light"]'
				lang={props.className === "language-python" ? "py" : "ts"}
			>
				{children}
			</Code>
		);
	};
}

function slugify(str) {
	return str
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
	const Heading = ({ children }) => {
		const slug = slugify(children);
		return React.createElement(
			`h${level}`,
			{
				id: slug,
				className: styles[`h${level}`],
			},
			[
				React.createElement(
					"a",
					{
						href: `#${slug}`,
						key: `link-${slug}`,
					},
					children,
				),
			],
		);
	};

	Heading.displayName = `Heading${level}`;

	return Heading;
}

export async function CustomMDX(props) {
	const theme = await getCurrentTheme();
	const components = {
		h1: createHeading(1),
		h2: createHeading(2),
		h3: createHeading(3),
		h4: createHeading(4),
		h5: createHeading(5),
		h6: createHeading(6),
		Image: RoundedImage,
		a: CustomLink,
		code: CodeComponent(theme),
		Table,
		RegistrationForm,
		p: ({ children }) => <p className={styles.p}>{children}</p>,
		blockquote: ({ children }) => (
			<blockquote className={styles.blockquote}>{children}</blockquote>
		),
		ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
	};
	return (
		<article className={styles.article}>
			<MDXRemote
				source={props.source}
				options={props.options}
				components={{ ...components, ...(props.components || {}) }}
			/>
		</article>
	);
}
