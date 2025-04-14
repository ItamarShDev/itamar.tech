"use client";
import type { ChartData } from "chart.js";
import { Radar } from "react-chartjs-2";
import useChartSettings, { type ChartSettings } from "./chart-settings";

const labels = [
	"Python",
	"Node.js",
	"JavaScript",
	"CSS",
	"React",
	"Go",
	"TypeScript",
];

const values = [
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
	const { data, radarOptions }: ChartSettings = useChartSettings({
		labels,
		values,
		title: "Abilities",
	});
	console.log(data, radarOptions);
	if (data)
		return <Radar data={data as ChartData<"radar">} options={radarOptions} />;
	return null;
};

export default Abilities;
