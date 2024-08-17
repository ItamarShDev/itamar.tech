import { getQuotesData } from "lib/get-data-methods";

export default async function Home() {
	const quotes = await getQuotesData();
	return <>NEW</>;
}
