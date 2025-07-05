import FireworksBackground from "layouts/fireworks-background";
import HomeBackground from "layouts/home-background";
import HomePage from "layouts/home-page";
import { getFromKV } from "lib/get-data-methods";
import { shouldShowFireworks } from "lib/headers";
export const metadata = {
	title: {
		default: "Itamar Sharify",
		template: "%s - Itamar Sharify",
	},
	openGraph: {
		title: "Itamar Sharify",
		description: "Itamar Sharify",
		type: "website",
		url: "itamar.dev",
		images: ["/images/meta-image.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "Itamar Sharify",
		description: "Itamar Sharify",
		images: ["/images/meta-image.png"],
	},
};

export default async function Home() {
	let quotes = null;
	try {
		quotes = await getFromKV("quotes");
	} catch (error) {
		console.log("KV not available, using fallback quotes");
		// Fallback quotes for development
		quotes = {
			en: {
				"Steve Jobs": {
					"role": "Co-founder of Apple",
					"profile": "https://en.wikipedia.org/wiki/Steve_Jobs",
					"quotes": [
						"The only way to do great work is to love what you do.",
						"Innovation distinguishes between a leader and a follower.",
						"Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work."
					]
				}
			}
		};
	}
	
	const showFireworks = await shouldShowFireworks();

	return (
		<>
			{showFireworks ? <FireworksBackground /> : <HomeBackground />}
			<HomePage quotes={quotes?.en} />
		</>
	);
}
