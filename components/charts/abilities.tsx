import type { ChartData } from "chart.js";
import { Radar } from "react-chartjs-2";
import useChartSettings, { type ChartSettings } from "./chart-settings";

/**
 * Shows a Radar chart with given data
 */
const Abilities = ({ labels, values, ...props }) => {
	const { data, radarOptions }: ChartSettings = useChartSettings({
		labels,
		values,
		title: "Abilities",
	});
	if (data)
		return (
			<Radar
				{...props}
				data={data as ChartData<"radar">}
				options={radarOptions}
			/>
		);
	return null;
};
Abilities.defaultProps = {
	labels: [{}],
	values: [],
};
export default Abilities;
