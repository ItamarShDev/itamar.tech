"use client";
import type { ChartData } from "chart.js";
import useChartSettings, {
    randomChartData,
} from "components/charts/chart-settings";
import { Input } from "components/input";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "./ChartsCommunication.module.css";

class CustomEventHandler {
	subscribe(eventName: string, cb: (value: unknown) => void) {
		window.addEventListener(eventName, cb);
	}

	unsubscribe(eventName: string, cb: (value: unknown) => void) {
		window.removeEventListener(eventName, cb);
	}
	emit(eventName: string, payload: unknown) {
		window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
	}
}

const EventHandler = new CustomEventHandler();

// mimic response

export class EventRouter {
	eventHandler: CustomEventHandler;
	interval: NodeJS.Timeout | null = null;
	constructor() {
		this.eventHandler = EventHandler;
	}

	fetchChartsData(chartIds: number[]) {
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.interval = setInterval(() => {
			for (const id of chartIds) {
				this.eventHandler.emit(`${id}::data`, {
					data: randomChartData(id),
				});
			}
		}, 3000);
	}
}

function Chart({ chartId }) {
	const [chartData, setChartData] = useState(randomChartData(chartId));
	const { data, lineOptions } = useChartSettings(chartData);
	useEffect(() => {
		const chartEventHandler = (event: CustomEvent) => {
			if (event.detail.data) {
				setChartData(event.detail.data);
			}
		};

		EventHandler.subscribe(`${chartId}::data`, chartEventHandler);
		return () => {
			EventHandler.unsubscribe(`${chartId}::data`, chartEventHandler);
		};
	}, [chartId]);

	if (data) {
		return <Line data={data as ChartData<"line">} options={lineOptions} />;
	}
	return null;
}

export default function ChartsCommunicationExample() {
	const [numberOfCharts, setNumberOfCharts] = useState(5);
	const chart_ids = Array.from(Array(numberOfCharts).keys());
	const [chartIds, setChartIds] = useState(chart_ids);
	const routerRef = useRef(new EventRouter());

	useEffect(() => {
		setChartIds(Array.from(Array(numberOfCharts).keys()));
	}, [numberOfCharts]);

	useEffect(() => {
		routerRef.current.fetchChartsData(chartIds);
	}, [chartIds]);

	return (
		<>
			<section className={styles.inputSection}>
				<Input
					label="Set number of charts"
					type="number"
					name="Number of charts"
					id="charts-number"
					defaultValue={numberOfCharts}
					onChange={(e) => setNumberOfCharts(Number(e.target.value))}
				/>
			</section>
			<section className={styles.chartsSection}>
				{chartIds.map((id) => (
					<div key={id}>
						<Chart chartId={id} />
					</div>
				))}
			</section>
		</>
	);
}
