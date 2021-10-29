import useChartSettings, {
    ChartSettings,
} from "components/charts/chart-settings";
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";

class CustomEventHandler {
    subscribe(eventName: any, cb: any) {
        window.addEventListener(eventName, cb);
    }

    emit(eventName: any, payload: any) {
        window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
    }
}

const EventHandler = new CustomEventHandler();

// mimic response

function randomChartData(id: number) {
    const socialData = {
        title: `Chart #${id}`,
        labels: ["1 week", "1 month", "4 months", "6 months", "1 year"],
        values: [
            {
                title: "Learning",
                values: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
                settings: { fill: false },
            },
            {
                title: "Mingeling",
                values: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ],
                settings: { fill: false },
            },
            {
                title: "Involvement",
                values: [
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
export class EventRouter {
    eventHandler: CustomEventHandler;
    constructor() {
        this.eventHandler = EventHandler;
    }

    fetchChartsData(chartIds: number[]) {
        setInterval(() => {
            chartIds.forEach((id: number) => {
                this.eventHandler.emit(id + "::data", {
                    data: randomChartData(id),
                });
            });
        }, 3000);
    }
}

function Chart({ chartId }) {
    const [chartData, setChartData] = React.useState(randomChartData(chartId));
    const { data, lineOptions }: ChartSettings = useChartSettings(chartData);

    useEffect(() => {
        EventHandler.subscribe(chartId + "::data", (event) => {
            if (event.detail.data) {
                setChartData(event.detail.data);
            }
        });
    }, []);
    if (data) {
        return <Line data={data} options={lineOptions} />;
    }
    return null;
}

export default function ChartsCommunicationExample() {
    const chartIds = [1, 2, 3, 4, 5];

    useEffect(() => {
        const router = new EventRouter();
        router.fetchChartsData(chartIds);
    }, []);

    return (
        <>
            <section>
                {chartIds.map((id) => (
                    <div className="chart" key={id}>
                        <Chart chartId={id} />
                    </div>
                ))}
            </section>
            <style jsx>{`
                section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    grid-template-rows: repeat(auto-fit, 1fr);
                    gap: 10px;
                }
            `}</style>
        </>
    );
}
