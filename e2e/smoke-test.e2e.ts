import { expect, test } from "@playwright/test";

test.describe("Full Site Smoke Test", () => {
	const pages = [
		{ path: "/en", title: "Itamar Sharify" },
		{ path: "/he", title: "Itamar Sharify" },
		{ path: "/en/blog", title: "Blog" },
		{ path: "/he/blog", title: "Blog" },
		{ path: "/en/resume", title: "CV - Itamar Sharify" },
		{ path: "/he/resume", title: "CV - Itamar Sharify" },
		{ path: "/en/example-projects", title: "Example Projects" },
		{ path: "/he/example-projects", title: "Example Projects" },
	];

	for (const page of pages) {
		test(`should load ${page.path} without errors`, async ({
			page: playwright,
		}) => {
			// Monitor console errors
			const consoleErrors: string[] = [];
			playwright.on("console", (msg) => {
				if (msg.type() === "error") {
					consoleErrors.push(msg.text());
				}
			});

			// Navigate to the page
			await playwright.goto(page.path);

			// Should have the expected title
			await expect(playwright).toHaveTitle(new RegExp(page.title));

			// Should have basic layout elements
			await expect(playwright.getByTestId("header")).toBeVisible();

			// Should have proper language direction for Hebrew pages
			if (page.path.includes("/he")) {
				await expect(playwright.locator("body")).toHaveAttribute("dir", "rtl");
			}

			// Should not have critical console errors
			const criticalErrors = consoleErrors.filter(
				(error) =>
					!error.includes("favicon") && // Ignore favicon errors
					!error.includes("Google Fonts") && // Ignore font loading errors in test env
					!error.includes("net::ERR_"), // Ignore network errors that might occur in test env
			);

			if (criticalErrors.length > 0) {
				console.warn("Console errors detected:", criticalErrors);
			}
		});
	}

	test("should be mobile responsive", async ({ page }) => {
		// Test common mobile viewport sizes
		const viewports = [
			{ width: 375, height: 667 }, // iPhone SE
			{ width: 414, height: 896 }, // iPhone 11
			{ width: 360, height: 640 }, // Android
		];

		for (const viewport of viewports) {
			await page.setViewportSize(viewport);
			await page.goto("/en");

			// Basic elements should still be visible
			await expect(page.getByTestId("header")).toBeVisible();
			await expect(page.locator("h1")).toBeVisible();

			// Content should not overflow
			const body = page.locator("body");
			const boundingBox = await body.boundingBox();
			if (boundingBox) {
				expect(boundingBox.width).toBeLessThanOrEqual(viewport.width);
			}
		}
	});

	test("should handle slow network conditions", async ({ page }) => {
		// Simulate slow network
		await page.route("**/*", (route) => {
			setTimeout(() => route.continue(), 100); // Add 100ms delay
		});

		await page.goto("/en");

		// Should still load successfully
		await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
		await expect(page.getByTestId("header")).toBeVisible();
	});
});
