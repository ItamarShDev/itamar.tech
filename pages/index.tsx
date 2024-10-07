import HomeBackground from "layouts/home-background";
import HomePage from "layouts/home-page";
import { getQuotesData } from "lib/get-data-methods";

export default function Home({ quotes }) {
	return (
		<>
			<HomeBackground />
			<HomePage quotes={quotes} />
		</>
	);
}
export async function getStaticProps({ locale }) {
	const quotes = await getQuotesData();
	return {
		props: {
			isCentered: false,
			quotes: quotes?.[locale || "en"],
		},
	};
}
