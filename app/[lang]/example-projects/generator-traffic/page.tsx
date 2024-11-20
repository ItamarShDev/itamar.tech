import { IDS } from "app/[lang]/example-projects/generator-traffic/example/helpers";
import { getTranslationsCache } from "lib/server-cache";
import type { Metadata } from "next";
import { TrafficLight, TrafficProvider } from "./example/provider";

export const metadata: Metadata = {
	title: "Generator Traffic Example",
};

export default async function GeneratorTraffic() {
	const texts = await getTranslationsCache("generator_traffic");
	const playerTexts = await getTranslationsCache("player");
	return (
		<>
			<h1>{texts.title}</h1>
			<h3>{texts.subtitle}</h3>
			<TrafficProvider texts={playerTexts}>
				{IDS.map((id) => (
					<TrafficLight key={id} trafficId={id} />
				))}
			</TrafficProvider>
		</>
	);
}
