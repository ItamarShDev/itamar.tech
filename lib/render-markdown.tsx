import rehypeShiki from "@shikijs/rehype";
import { transformerNotationHighlight } from "@shikijs/transformers";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
export async function renderMarkdown(markdown: string): Promise<string> {
	const processor = unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeShiki, {
			addLanguageClass: true,
			// or `theme` for a single theme
			themes: {
				light: "light-plus",
				dark: "night-owl",
				monokai: "monokai",
				cobalt2: "poimandres",
			},
			transformers: [transformerNotationHighlight()],
		})
		.use(rehypeStringify);

	const result = await processor.process(markdown);
	return String(result);
}
