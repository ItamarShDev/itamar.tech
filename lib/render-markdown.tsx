// @ts-nocheck
import { Renderer, marked } from "marked";
import { Highlight, themes } from "prism-react-renderer";

const renderer = new Renderer();

renderer.heading = ({ text, depth }) => {
	const id = crypto.randomUUID();
	const Component = `h${depth}`;

	return `<h${depth} id='${id}'>
			<a
				href='#${id}'
				className="header-link"
			>${text}</a>
		</h${depth}>`;
};
renderer.link = (href, _, text) =>
	`<a href=${href} target="_blank" rel="noopener noreferrer">${text}</a>`;

renderer.listitem = ({ checked, text, task }) => {
	if (task) {
		return `<li class="reset"><span class="check">&#8203;<input type="checkbox" disabled ${
			checked ? "checked" : ""
		} /></span><span>${text}</span></li>`;
	}

	return `<li>${text}</li>`;
};
renderer.code = ({ text, raw, lang }) => {
	const opts = raw.split(" ").map((o) => o.trim());
	const language = lang?.split(" ")[0];
	const highlight = opts
		.filter((o) => o.startsWith("highlight="))
		.pop()
		?.replace("highlight=", "")
		.trim();
	return <Code language={language} code={text} highlight={highlight} />;
};

marked.setOptions({
	gfm: true,
	breaks: true,
	headerIds: true,
	renderer,
});

const mark = (markdown) => marked.parse(markdown);
export default mark;
const Code = ({ code, language, highlight, ...props }) => {
	if (!language)
		// biome-ignore lint/security/noDangerouslySetInnerHtml: Needed
		return <code {...props} dangerouslySetInnerHTML={{ __html: code }} />;

	const highlightedLines = highlight
		? highlight.split(",").reduce((lines, h) => {
				if (h.includes("-")) {
					// Expand ranges like 3-5 into [3,4,5]
					const [start, end] = h.split("-").map(Number);
					const x = Array(end - start + 1)
						.fill()
						.map((_, i) => i + start);
					return lines.concat(x);
				}
				lines.push(Number(h));

				return lines;
			}, [])
		: [];

	return (
		<Highlight
			theme={themes.shadesOfPurple}
			code={code.trim()}
			language={language}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre dir="ltr" className={className} style={style}>
					{tokens.map((line, i) => (
						<div
							key={line}
							{...getLineProps({ line, key: i })}
							style={
								highlightedLines.includes(i + 1)
									? {
											background: "rgba(255,255,255,0.1)",
											margin: "0 -1rem",
											padding: "0 1rem",
											display: "table-row",
										}
									: { display: "table-row" }
							}
						>
							<span
								style={{
									display: "table-cell",
									textAlign: "right",
									padding: "0 2rem 0 0.5rem",
									userSelect: "none",
									opacity: 0.5,
								}}
							>
								{i + 1}
							</span>
							<span
								style={{
									display: "table-cell",
								}}
							>
								{line.map((token, key) => (
									<span
										key={token.content}
										{...getTokenProps({ token, key })}
									/>
								))}
							</span>
						</div>
					))}
				</pre>
			)}
		</Highlight>
	);
};
