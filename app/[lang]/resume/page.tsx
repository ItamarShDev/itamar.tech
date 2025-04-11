import { getFromKV, getResumeDataByLocale } from "lib/get-data-methods";
import type { Metadata } from "next";
import { Suspense } from "react";
import ResumeClient from "./resume-client";

export const metadata: Metadata = {
	title: "CV",
};

async function getData(locale: "en" | "he" = "en") {
	const resumeData = await getResumeDataByLocale(locale);
	const attributesData = await getFromKV("attributes");
	return {
		resumeData,
		attributesData,
	};
}

export default async function Resume({
	params,
}: { params: Promise<{ lang: "en" | "he" }> }) {
	const { lang } = await params;
	const { resumeData } = await getData(lang ?? "en");
	return (
		<section>
			<Suspense fallback={<div>Loading...</div>}>
				<ResumeClient initialJobs={resumeData?.jobs || []} />
			</Suspense>
		</section>
	);
}
