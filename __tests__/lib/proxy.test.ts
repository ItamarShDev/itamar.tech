import { describe, expect, test } from "bun:test";
import { NextRequest } from "next/server";
import { proxy } from "../../proxy";

describe("English-only routes", () => {
	test.each([
		"",
		"/about",
		"/work/reactwind",
		"/blog/a-post",
		"/resume",
		"/example-projects/generator-traffic",
	])(
		"permanently redirects /he%s without dropping the query string",
		(path) => {
			const response = proxy(
				new NextRequest(`https://itamar.tech/he${path}?source=legacy&ref=one`)
			);
			expect(response.status).toBe(308);
			expect(response.headers.get("location")).toBe(
				`https://itamar.tech/en${path}?source=legacy&ref=one`
			);
		}
	);

	test("prefixes unlocalized paths without mistaking /hello for Hebrew", () => {
		const response = proxy(
			new NextRequest("https://itamar.tech/hello?ref=one")
		);
		expect(response.headers.get("location")).toBe(
			"https://itamar.tech/en/hello?ref=one"
		);
	});

	test.each([
		"/en",
		"/en/about",
		"/manifest.json",
		"/fonts/studio-inter.woff2",
		"/images/me.png",
	])("does not redirect %s", (path) => {
		const response = proxy(new NextRequest(`https://itamar.tech${path}`));
		expect(response.headers.has("location")).toBe(false);
	});
});
