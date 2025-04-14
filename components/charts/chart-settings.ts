"use client";
import { useChartTheme } from "lib/hooks/useChartTheme";
import { hexToHSL } from "lib/utils";

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
import { useEffect, useMemo, useState } from "react";

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

function themedDatasets(values, theme: ReturnType<typeof useChartTheme>) {
	return values.map((item, index) => {
		const [h, s, l] = hexToHSL(theme.charts, index);
		const dataset = {
			label: item.label,
			data: item.data,
			borderWidth: 2,
			backgroundColor: `hsla(${h}, ${s}%, ${l}%, 0.2)`,
			borderColor: `hsl(${h}, ${s}%, ${l}%)`,
			yAxisID: "yAxis",
			xAxisID: "xAxis",
		};
		if (Object.hasOwn(item, "settings")) {
			return { ...dataset, ...item.settings };
		}
		return dataset;
	});
}

function themedRadarSettings(title, theme: ReturnType<typeof useChartTheme>) {
	return {
		maintainAspectRatio: false,
		aspectRatio: 1,
		tooltips: {
			enabled: false,
		},
		plugins: {
			title: {
				display: true,
				text: title,
				color: theme.text,
			},
			legend: { display: false },
		},
		scales: {
			r: {
				pointLabels: { color: theme.text },
				ticks: {
					display: false,
					maxTicksLimit: 1,
				},
			},
		},
	};
}

function themedLineSettings(title, theme: ReturnType<typeof useChartTheme>) {
	return {
		maintainAspectRatio: false,
		aspectRatio: 1,
		spanGaps: false,
		plugins: {
			legend: {
				position: "top",
				fullWidth: true,
				labels: {
					boxWidth: 5,
					color: theme.text,
				},
			},
			title: {
				display: true,
				text: title,
				color: theme.text,
			},
		},
		tooltips: {
			enabled: false,
		},
		scales: {
			xAxis: {
				ticks: { color: theme.text },
				gridLines: {
					drawTicks: false,
					drawOnChartArea: false,
					color: theme.headerText,
				},
			},

			yAxis: {
				display: true,
				ticks: { display: false },
				gridLines: {
					drawTicks: false,
					drawOnChartArea: false,
					color: theme.headerText,
				},
			},
		},
	};
}

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

export type ChartSettings = {
	data?: { datasets: object[]; labels: string[] };
	radarOptions?: object;
	lineOptions?: object;
};
export default function useChartSettings({
	title = "Empty",
	values = [],
	labels = ["Empty"],
}: ReturnType<typeof randomChartData>): ChartSettings {
	const [settings, setSettings] = useState({});
	const theme = useChartTheme();
	const datasets = useMemo(
		() => themedDatasets(values, theme),
		[values, theme],
	);
	useEffect(() => {
		const data = {
			labels,
			datasets,
		};
		const radarOptions = themedRadarSettings(title, theme);
		const lineOptions = themedLineSettings(title, theme);
		setSettings({ lineOptions, radarOptions, data });
	}, [theme, datasets, labels, title]);

	return settings;
}
