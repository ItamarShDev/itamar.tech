import ChartsCommunicationExample from "example-projects/ChartsCommunication";
import React from "react";
export default function ChartsCommunications() {
	const [isHydrated, setIsHydrated] = React.useState(false);
	React.useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (isHydrated)
		return (
			<>
				<h1>These charts are upadated together with EventListeners</h1>
				<section>
					<ChartsCommunicationExample />
				</section>
			</>
		);
	return null;
}
