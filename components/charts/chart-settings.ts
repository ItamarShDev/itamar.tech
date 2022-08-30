import { getCurrentTheme } from "lib/hooks/useTheme";
import { hexToHSL } from "lib/utils";

import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    Title,
    Filler,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    Title,
    Filler,
    Legend
);

function themedDatasets(values, theme) {
    return values.map((item, index) => {
        const [h, s, l] = hexToHSL(theme.charts, index);
        const dataset = {
            label: item.label,
            data: item.data,
            borderWidth: 2,
            backgroundColor: `hsla(${h}, ${s}%, ${l}%, 0.2)`,
            borderColor: `hsl(${h}, ${s}%, ${l}%)`,
        };
        if (item.hasOwnProperty("settings")) {
            return { ...dataset, ...item.settings };
        }
        return dataset;
    });
}

function themedRadarSettings(title, theme) {
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

function themedLineSettings(title, theme) {
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
export type ChartSettings = {
    data?: { datasets: object[]; labels: string[] };
    radarOptions?: object;
    lineOptions?: object;
};
export default function useChartSettings({
    title = "Empty",
    values = [],
    labels = [{}],
}): ChartSettings {
    const [settings, setSettings] = useState({});
    const theme = getCurrentTheme();
    const datasets = themedDatasets(values, theme);
    useEffect(() => {
        const data = {
            labels,
            datasets,
        };
        const radarOptions = themedRadarSettings(title, theme);
        const lineOptions = themedLineSettings(title, theme);
        setSettings({ lineOptions, radarOptions, data });
    }, [theme, values]);

    return settings;
}
