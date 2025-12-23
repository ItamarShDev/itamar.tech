"use client";
import type { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartSettings } from "lib/utils/chart";
import { useTranslation } from "translations/hooks";
import useChartSettings from "./chart-settings";

const defaultLabels = ["1 week", "1 month", "4 months", "6 months", "1 year"];

/**
 * Shows a Line chart with given data
 */
const SocialAffect = () => {
	const { translations: chartsTranslations } = useTranslation('charts');
	
	const progressTranslations = chartsTranslations?.progress;
	const title = progressTranslations?.title || "Progress Over Time";
	const labels = progressTranslations?.labels || defaultLabels;

	const socialData = {
		title,
		labels,
		values: [
			{
				label: progressTranslations?.userOriented || "User oriented design",
				data: [70, 80, 90, 100, 100],
				settings: {
					fill: false,
				},
			},
			{
				label: progressTranslations?.learning || "Learning",
				data: [10, 30, 50, 90, 100],
				settings: { fill: false },
			},
			{
				label: progressTranslations?.mingling || "Mingling",
				data: [50, 50, 80, 90, 90],
				settings: { fill: false },
			},
			{
				label: progressTranslations?.involvement || "Involvement",
				data: [0, 20, 30, 60, 80],
				settings: { fill: false },
			},
		],
	};

	const { data, lineOptions }: ChartSettings = useChartSettings(socialData);
	if (data) {
		return <Line data={data as ChartData<"line">} options={lineOptions} />;
	}
	return null;
};

export default SocialAffect;
