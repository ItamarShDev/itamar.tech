import { kv } from "@vercel/kv";
import type { Job as JobType } from "lib/types/jobs";

export type JsonType = Record<"en" | "he", { jobs: JobType[] }>;

export async function getResumeDataByLocale(locale: "en" | "he") {
	const resume = await getFromKV("resume");
	return resume?.[locale];
}

export function getFromKV(key) {
	// Check if KV credentials are available
	if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_URL === 'https://fake-kv-url.com') {
		console.warn(`KV not available, returning empty data for key: ${key}`);
		return Promise.resolve(null);
	}
	
	try {
		return kv.hgetall<JsonType>(key);
	} catch (error) {
		// Return empty data for testing when KV is not available
		console.warn(`KV error, returning empty data for key: ${key}`, error);
		return Promise.resolve(null);
	}
}
