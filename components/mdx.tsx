import { RegistrationForm } from "app/blog/posts/examples/translation-example/registration-form";
import { Code } from "bright";
import { getCurrentTheme } from "lib/headers";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

function CodeComponent(theme) {
	return function Component({ children, ...props }) {
		let codeTheme: typeof Code.theme = "dark-plus";
		if (theme === "dark") {
			codeTheme = "dracula";
		} else if (theme === "light") {
			codeTheme = "light-plus";
		} else if (theme === "monokai") {
			codeTheme = "monokai";
		} else if (theme === "cobalt2") {
			codeTheme = "solarized-dark";
		}
		return (
			<Code
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
			{ id: slug },
			[
				React.createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children,
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
	};
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
		/>
	);
}
