import type { Metadata } from "next";
import ChartsCommunicationExample from "./ChartsCommunication";

export const metadata: Metadata = {
	title: "Charts Communications Example",
};

export default function ChartsCommunications() {
	return (
		<>
			<h1>These charts are updated together with EventListeners</h1>
			<section>
				<ChartsCommunicationExample />
			</section>
		</>
	);
}
