"use client";
import { useChartTheme } from "lib/hooks/useChartTheme";
import {
    themedDatasets,
    themedRadarSettings,
    themedLineSettings, type ChartSettings
} from "lib/utils/chart";

import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    RadialLinearScale,
    Title,
} from "chart.js";

ChartJS.register(
	LineElement,
	PointElement,
	RadialLinearScale,
	CategoryScale,
	LinearScale,
	Title,
	Filler,
	Legend,
);

// Using themedDatasets from @/lib/utils/chart

// Using themedRadarSettings and themedLineSettings from lib/utils/chart

// This function is kept for backward compatibility
export function randomChartData(id: number) {
	const socialData = {
		title: `Chart #${id}`,
		labels: ["1 week", "1 month", "4 months", "6 months", "1 year"],
		values: [
			{
				label: "Learning",
				data: [
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
				],
				settings: { fill: false },
			},
			{
				label: "Mingeling",
				data: [
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
				],
				settings: { fill: false },
			},
			{
				label: "Involvement",
				data: [
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
				],
				settings: { fill: false },
			},
		],
	};

	return socialData;
}

// Using ChartSettings type from lib/utils/chart
export default function useChartSettings({
	title = "Empty",
	values = [],
	labels = ["Empty"],
}: ReturnType<typeof randomChartData>): ChartSettings {
	const theme = useChartTheme();
	const datasets = themedDatasets(values, theme);
	const data = {
		labels,
		datasets,
	};
	const radarOptions = themedRadarSettings(title, theme);
	const lineOptions = themedLineSettings(title, theme);

	return { lineOptions, radarOptions, data };
}
