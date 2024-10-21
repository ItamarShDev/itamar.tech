import { IDS } from "components/generator-traffic/helpers";
import {
	TrafficLight,
	TrafficProvider,
} from "components/generator-traffic/provider";
import { useTranslation } from "lib/hooks/useTranslation";
import styles from "./style.module.css";

export default function Page() {
	const texts = useTranslation({
		en: {
			title: "Generators based traffic",
			subtitle: "A traffic cross synced with State Machine and Generators",
		},
		he: {
			title: "רמזורים",
			subtitle: "רמזורים עם ג׳נרטור",
		},
	});
	return (
		<>
			<h1>{texts.title}</h1>
			<h3>{texts.subtitle}</h3>
			<section className={styles.traffic}>
				<TrafficProvider>
					{IDS.map((id) => (
						<TrafficLight key={id} trafficId={id} />
					))}
				</TrafficProvider>
			</section>
		</>
	);
}
