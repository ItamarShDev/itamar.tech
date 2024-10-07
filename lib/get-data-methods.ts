import { kv } from "@vercel/kv";
import fs from "node:fs";
import path from "node:path";
const directory = path.join(process.cwd(), "static-props");
export type JsonType = Record<"en" | "he", Record<string, string>>;
export async function getResume() {
	const resume = await getFromKV("resume");
	return resume;
}
export async function getResumeData(locale) {
	const resume = await getResume();
	return resume?.[locale];
}

export async function getAttributesData() {
	const attributes = await getFromKV("attributes");
	return attributes;
}

export async function getQuotesData() {
	const quotes = await getFromKV("quotes");
	return quotes;
}

export function getResumeJSON() {
	const fullPath = path.join(directory, "resume.json");
	const fileContents = fs.readFileSync(fullPath, "utf8");
	// Combine the data with the id and contentHtml
	const resume = JSON.parse(fileContents);
	return resume;
}
export async function getAttributesDataJSON() {
	const fullPath = path.join(directory, "technologies.json");
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Combine the data with the id and contentHtml
	return JSON.parse(fileContents);
}

export async function getQuotesDataJSON() {
	const fullPath = path.join(directory, "quotes.json");
	const fileContents = fs.readFileSync(fullPath, "utf8");
	// Combine the data with the id and contentHtml
	return JSON.parse(fileContents);
}
export function getFromKV(key) {
	return kv.hgetall<JsonType>(key);
}
