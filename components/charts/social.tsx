import { Line } from "react-chartjs-2";
import useChartSettings, { ChartSettings } from "./chart-settings";

export const socialData = {
    title: "Progess Over Time",
    labels: ["1 week", "1 month", "4 months", "6 months", "1 year"],
    values: [
        {
            label: "Learning",
            data: [10, 30, 50, 90, 100],
            settings: { fill: false },
        },
        {
            label: "Mingeling",
            data: [50, 50, 80, 90, 90],
            settings: { fill: false },
        },
        {
            label: "Involvement",
            data: [0, 20, 30, 60, 80],
            settings: { fill: false },
        },
    ],
};

/**
 * Shows a Line chart with given data
 */
const SocialAffect = () => {
    const { data, lineOptions }: ChartSettings = useChartSettings(socialData);
    if (data) {
        return <Line data={data} options={lineOptions} />;
    }
    return null;
};
export default SocialAffect;
