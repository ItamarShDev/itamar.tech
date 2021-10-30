import { getCurrentTheme } from "lib/hooks/useTheme";
import { hexToHSL } from "lib/utils";

import { useState, useEffect } from "react";
function themedDatasets(values, theme) {
    return values.map((item, index) => {
        const [h, s, l] = hexToHSL(theme.charts, index);
        const dataset = {
            label: item.title,
            data: item.values,
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
        title: {
            display: true,
            text: title,
            fontColor: theme.text,
        },
        legend: { display: false },
        scale: {
            angleLines: { color: theme.text },
            gridLines: {
                drawTicks: false,
                drawOnChartArea: false,
                color: theme.headerText,
            },
            labels: { fontColor: theme.text },
            ticks: {
                display: false,
                maxTicksLimit: 1,
            },
            pointLabels: { fontColor: theme.text },
        },
    };
}

function themedLineSettings(title, theme) {
    return {
        maintainAspectRatio: false,
        aspectRatio: 1,

        legend: {
            position: "top",
            fullWidth: true,
            labels: {
                boxWidth: 5,
                fontColor: theme.text,
            },
        },
        spanGaps: false,
        tooltips: {
            enabled: false,
        },
        title: {
            display: true,
            text: title,
            fontColor: theme.text,
        },
        scales: {
            xAxes: [
                {
                    ticks: { fontColor: theme.text },
                    gridLines: {
                        drawTicks: false,
                        drawOnChartArea: false,
                        color: theme.headerText,
                    },
                },
            ],
            yAxes: [
                {
                    display: true,
                    ticks: { display: false },
                    gridLines: {
                        drawTicks: false,
                        drawOnChartArea: false,
                        color: theme.headerText,
                    },
                },
            ],
        },
    };
}
export type ChartSettings = {
    data?: object;
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
            labels: labels,
            datasets: datasets,
        };
        const radarOptions = themedRadarSettings(title, theme);
        const lineOptions = themedLineSettings(title, theme);
        setSettings({ lineOptions, radarOptions, data });
    }, [theme, values]);

    return settings;
}
