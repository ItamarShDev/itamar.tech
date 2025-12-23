"use client";
import type { ChartData } from "chart.js";
import { Radar } from "react-chartjs-2";
import type { ChartSettings } from "lib/utils/chart";
import { useTranslation } from "translations/hooks";
import useChartSettings from "./chart-settings";

const labels = [
	"Python",
	"Node.js",
	"JavaScript",
	"CSS",
	"React",
	"Go",
	"TypeScript",
];

const defaultValues = [
	{
		label: "Abilities",
		data: [85, 70, 90, 90, 90, 70, 90],
		settings: { fill: false },
	},
];

/**
 * Shows a Radar chart with given data
 */
const Abilities = () => {
	const { translations: chartsTranslations } = useTranslation('charts');
	
	const title = chartsTranslations?.abilities?.title || "Abilities";
	const values = [
		{
			...defaultValues[0],
			label: title,
		},
	];

	const { data, radarOptions }: ChartSettings = useChartSettings({
		labels,
		values,
		title,
	});
	if (data)
		return <Radar data={data as ChartData<"radar">} options={radarOptions} />;
	return null;
};

export default Abilities;
