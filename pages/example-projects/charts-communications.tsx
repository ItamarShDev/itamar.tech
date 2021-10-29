import ChartsCommunicationExample from "example-projects/ChartsCommunication";
import React from "react";
export default function ChartsCommunications() {
    if (process.browser)
        return (
            <>
                <h1>These chart are upadaed once with EventListeners</h1>
                <section>
                    <ChartsCommunicationExample />
                </section>
            </>
        );
    else return null;
}
