import HomeBackground from "layouts/home-background";
import HomePage from "layouts/home-page";
import { getQuotesData } from "lib/get-data-methods";

async function getData() {
	const quotes = await getQuotesData();
	return quotes;
}

export default async function Home() {
	const quotes = await getData();

	return (
		<>
			<HomeBackground />
			<HomePage quotes={quotes?.en} />
		</>
	);
}
