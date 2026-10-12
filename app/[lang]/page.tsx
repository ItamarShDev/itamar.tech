import StudioHome from "layouts/studio-home";
import type { Metadata } from "next";

export const metadata: Metadata = {
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

export default function Home() {
	return <StudioHome />;
}
