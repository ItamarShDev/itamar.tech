import { kv } from "@vercel/kv";
import type { Job as JobType } from "lib/types/jobs";

export type JsonType = Record<"en" | "he", { jobs: JobType[] }>;

export async function getResumeDataByLocale(locale: "en" | "he") {
	const resume = await getFromKV("resume");
	return resume?.[locale];
}

export async function getFromKV(key: string) {
	// Check if KV credentials are available
	if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_URL === 'https://fake-kv-url.com') {
		console.warn(`KV not available, returning empty data for key: ${key}`);
		return Promise.resolve(null);
	}
	
	try {
		// Try to get as JSON string first (for keys like 'quotes')
		const data = await kv.get(key);
		if (data && typeof data === 'string') {
			try {
				return JSON.parse(data);
			} catch (parseError) {
				// If it's not valid JSON, return as is
				return data;
			}
		}
		// If data is already an object (for hash-like structures), return as is
		return data;
	} catch (error) {
		// Return empty data for testing when KV is not available
		console.warn(`KV error, returning empty data for key: ${key}`, error);
		return Promise.resolve(null);
	}
}
