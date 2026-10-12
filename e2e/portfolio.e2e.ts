import { expect, test } from "@playwright/test";

for (const lang of ["en", "he"]) {
	test(`portfolio navigation and localization: ${lang}`, async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (error) => errors.push(error.message));
		await page.goto(`/${lang}`);
		await expect(page.locator("html")).toHaveAttribute("lang", lang);
		await expect(page.locator("body")).toHaveAttribute(
			"dir",
			lang === "he" ? "rtl" : "ltr"
		);
		await expect(page.getByRole("heading", { level: 1 })).toContainText(
			lang === "he" ? "אוהב לבנות" : "Thoughtful code"
		);
		await expect(page.locator('a[href*="tanstack.com"]')).toHaveCount(0);
		await page.getByTestId("project-reactwind").click();
		await expect(page).toHaveURL(`/${lang}/work/reactwind`);
		await expect(page.getByRole("heading", { level: 1 })).toHaveText(
			"Reactwind"
		);
		await expect(
			page.locator('main a[href="https://reactwind.itamar.dev"]')
		).toBeVisible();
		await page.goBack();
		await expect(page.getByTestId("project-reactwind")).toBeVisible();
		await page
			.getByTestId("header")
			.getByRole("link", {
				name: lang === "he" ? "קצת עליי" : "About",
				exact: true,
			})
			.click();
		await expect(page).toHaveURL(`/${lang}/about`);
		await expect(page.getByRole("heading", { level: 1 })).toContainText(
			lang === "he" ? "איתמר" : "Itamar"
		);
		await page
			.getByRole("link", {
				name: lang === "he" ? "English" : "עברית",
				exact: true,
			})
			.click();
		const other = lang === "he" ? "en" : "he";
		await expect(page).toHaveURL(`/${other}/about`);
		await expect(page.locator("html")).toHaveAttribute("lang", other);
		await expect(page.locator("body")).toHaveAttribute(
			"dir",
			other === "he" ? "rtl" : "ltr"
		);
		await expect(page.getByTestId("header")).toContainText(
			other === "he" ? "קצת עליי" : "About"
		);
		await expect(
			page.locator(`footer a[href="/${other}/resume"]`)
		).toBeVisible();
		expect(errors).toEqual([]);
	});

	test(`portfolio fits a narrow phone: ${lang}`, async ({ page }) => {
		await page.setViewportSize({ width: 320, height: 740 });
		for (const path of [
			"",
			"/about",
			"/work/reactwind",
			"/work/hakapit",
			"/work/conflict-bars",
		]) {
			await page.goto(`/${lang}${path}`);
			await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
			expect(
				await page.evaluate(
					() => document.documentElement.scrollWidth <= window.innerWidth
				)
			).toBe(true);
		}
	});
}

test("theme persists with reduced motion and legacy routes stay reachable", async ({
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
	await page.getByRole("link", { name: "Explore the experiments" }).click();
	await expect(page).toHaveURL("/en/example-projects");
	await expect(page.getByRole("button", { name: "Toggle chat" })).toBeVisible();
});
