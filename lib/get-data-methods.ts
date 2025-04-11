import { kv } from "@vercel/kv";
import type { Job as JobType } from "lib/types/jobs";

export type JsonType = Record<"en" | "he", { jobs: JobType[] }>;

export async function getResumeDataByLocale(locale: "en" | "he") {
	const resume = await getFromKV("resume");
	return resume?.[locale];
}

export function getFromKV(key) {
	return kv.hgetall<JsonType>(key);
}
