import HomeBackground from "layouts/home-background";
import HomePage from "layouts/home-page";
import { getFromKV } from "lib/get-data-methods";

export default async function Home() {
	const quotes = await getFromKV("quotes");

	return (
		<>
			<HomeBackground />
			<HomePage quotes={quotes?.en} />
		</>
	);
}
