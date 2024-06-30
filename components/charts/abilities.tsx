import PropTypes from "prop-types";
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
	if (data) return <Radar {...props} data={data} options={radarOptions} />;
	return null;
};
Abilities.propTypes = {
	labels: PropTypes.arrayOf(PropTypes.string),
	values: PropTypes.arrayOf(PropTypes.object),
};
Abilities.defaultProps = {
	labels: [{}],
	values: [],
};
export default Abilities;
