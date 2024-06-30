import HomeBackground from "layouts/home-background";
import HomePage from "layouts/home-page";
import { getQuotesData } from "lib/get-data-methods";
import React from "react";

export default function Home({ quotes }) {
	return (
		<>
			<HomeBackground />
			<HomePage quotes={quotes} />
		</>
	);
}
export async function getStaticProps({ params }) {
	const quotes = await getQuotesData();
	return {
		props: {
			isCentered: false,
			quotes,
		},
	};
}
