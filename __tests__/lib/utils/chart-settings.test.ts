import { describe, expect, test } from "bun:test";
import {
	type ChartTheme,
	themedLineSettings,
	themedRadarSettings,
} from "lib/utils/chart";

describe("Chart Settings Utilities", () => {
	const mockTheme: ChartTheme = {
		charts: "#123456",
		text: "#ffffff",
		headerText: "#cccccc",
	};

	describe("themedRadarSettings", () => {
		test("returns correct radar chart settings with theme applied", () => {
			const title = "Test Radar Chart";
			const settings = themedRadarSettings(title, mockTheme);

			expect(settings).toMatchObject({
				maintainAspectRatio: false,
				aspectRatio: 1,
				tooltips: { enabled: false },
				plugins: {
					title: {
						display: true,
						text: title,
						color: mockTheme.text,
					},
					legend: { display: false },
				},
			});

			// Check scales configuration
			expect(settings.scales?.r).toBeDefined();
			expect(settings.scales?.r.ticks).toEqual({
				display: false,
				maxTicksLimit: 1,
			});
			expect(settings.scales?.r.pointLabels).toEqual({
				color: mockTheme.text,
			});
		});
	});

	describe("themedLineSettings", () => {
		test("returns correct line chart settings with theme applied", () => {
			const title = "Test Line Chart";
			const settings = themedLineSettings(title, mockTheme);

			expect(settings).toMatchObject({
				maintainAspectRatio: false,
				aspectRatio: 1,
				spanGaps: false,
				plugins: {
					title: {
						display: true,
						text: title,
						color: mockTheme.text,
					},
					legend: {
						position: "top",
						fullWidth: true,
						labels: {
							boxWidth: 5,
							color: mockTheme.text,
						},
					},
				},
				tooltips: { enabled: false },
			});

			// Check scales configuration
			expect(settings.scales?.x).toBeDefined();
			expect(settings.scales?.x.ticks).toEqual({
				color: mockTheme.text,
			});
			expect(settings.scales?.x.grid).toEqual({
				drawTicks: false,
				drawOnChartArea: false,
				color: mockTheme.headerText,
			});

			expect(settings.scales?.y).toBeDefined();
			expect(settings.scales?.y).toMatchObject({
				display: true,
				ticks: { display: false },
				grid: {
					drawTicks: false,
					drawOnChartArea: false,
					color: mockTheme.headerText,
				},
			});
		});
	});
});
