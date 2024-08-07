import fs from "node:fs";
import path from "node:path";
const directory = path.join(process.cwd(), "static-props");

export async function getResumeData(locale) {
	const fullPath = path.join(directory, "resume.json");
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Combine the data with the id and contentHtml
	const resume = JSON.parse(fileContents);
	return resume[locale];
}

export async function getAttributesData() {
	const fullPath = path.join(directory, "technologies.json");
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Combine the data with the id and contentHtml
	return JSON.parse(fileContents);
}

export async function getQuotesData() {
	const fullPath = path.join(directory, "quotes.json");
	const fileContents = fs.readFileSync(fullPath, "utf8");
	// Combine the data with the id and contentHtml
	return JSON.parse(fileContents);
}
