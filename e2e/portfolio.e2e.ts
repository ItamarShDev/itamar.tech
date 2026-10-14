import { expect, test } from "@playwright/test";

test("English portfolio navigation and playful shapes", async ({ page }) => {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto("/en");
	await expect(page.locator("html")).toHaveAttribute("lang", "en");
	await expect(page.locator("body")).toHaveAttribute("dir", "ltr");
	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		"Thoughtful code"
	);
	await expect(
		page.locator('a[href*="tanstack.com"], a[href^="/he"], a[hreflang="he"]')
	).toHaveCount(0);
	const shapes = page.getByRole("button", { name: "Rearrange the shapes" });
	await shapes.focus();
	await page.keyboard.press("Enter");
	await expect(shapes).toHaveAttribute("data-turn", "1");
	await expect(page.getByText("A little less serious.")).toBeVisible();
	await page.keyboard.press("Space");
	await expect(shapes).toHaveAttribute("data-turn", "2");
	await page.getByTestId("project-reactwind").click();
	await expect(page).toHaveURL("/en/work/reactwind");
	await expect(page.getByRole("heading", { level: 1 })).toHaveText("Reactwind");
	await expect(
		page.locator('main a[href="https://reactwind.itamar.dev"]')
	).toBeVisible();
	await page.goBack();
	await expect(page.getByTestId("project-reactwind")).toBeVisible();
	await page
		.getByTestId("header")
		.getByRole("link", { name: "About", exact: true })
		.click();
	await expect(page).toHaveURL("/en/about");
	await expect(page.getByRole("heading", { level: 1 })).toContainText("Itamar");
	await expect(page.locator('footer a[href="/en/resume"]')).toBeVisible();
	expect(errors).toEqual([]);
});

test("Hebrew URLs permanently redirect to their English equivalents", async ({
	page,
	request,
}) => {
	for (const path of [
		"",
		"/about",
		"/work/reactwind",
		"/work/hakapit",
		"/work/conflict-bars",
		"/blog",
		"/resume",
		"/example-projects",
	]) {
		const response = await request.get(`/he${path}?source=legacy`, {
			maxRedirects: 0,
		});
		expect(response.status()).toBe(308);
		const location = response.headers().location;
		expect(location).toBeTruthy();
		const destination = new URL(location, response.url());
		expect(destination.pathname).toBe(`/en${path}`);
		expect(destination.search).toBe("?source=legacy");
	}
	await page.goto("/he/about?source=legacy");
	await expect(page).toHaveURL("/en/about?source=legacy");
	await expect(page.locator("html")).toHaveAttribute("lang", "en");
	await expect(page.locator("body")).toHaveAttribute("dir", "ltr");
	await expect(page.getByRole("heading", { level: 1 })).toContainText("Itamar");
});

test("portfolio fits a narrow phone", async ({ page }) => {
	await page.setViewportSize({ width: 320, height: 740 });
	for (const path of [
		"",
		"/about",
		"/work/reactwind",
		"/work/hakapit",
		"/work/conflict-bars",
	]) {
		await page.goto(`/en${path}`);
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		for (const image of await page.locator("main img").all()) {
			await image.scrollIntoViewIfNeeded();
			await expect
				.poll(() =>
					image.evaluate(
						(element: HTMLImageElement) =>
							element.complete && element.naturalWidth > 0
					)
				)
				.toBe(true);
		}
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= window.innerWidth
			)
		).toBe(true);
	}
});

test("themes persist with reduced motion and legacy features stay reachable", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/en");
	await page.getByRole("button", { name: "Switch to dark mode" }).click();
	await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
	await expect
		.poll(
			async () =>
				(await page.context().cookies()).find(
					(cookie) => cookie.name === "current-theme"
				)?.value
		)
		.toBe("dark");
	await page.reload();
	await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
	await page.getByTestId("header").locator("summary").click();
	await page.locator("#portfolio-theme").selectOption("monokai");
	await expect(page.locator("body")).toHaveAttribute("data-theme", "monokai");
	await page.getByRole("link", { name: "Explore the experiments" }).click();
	await expect(page).toHaveURL("/en/example-projects");
	await expect(page.getByRole("button", { name: "Toggle chat" })).toBeVisible();
});
