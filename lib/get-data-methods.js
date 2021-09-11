import fs from "fs";
import path from "path";
const directory = path.join(process.cwd(), "static-props");

export async function getResumeData() {
    const fullPath = path.join(directory, `resume.json`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Combine the data with the id and contentHtml
    return JSON.parse(fileContents);
}

export async function getAttributesData() {
    const fullPath = path.join(directory, `technologies.json`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Combine the data with the id and contentHtml
    return JSON.parse(fileContents);
}

export async function getQuotesData() {
    const fullPath = path.join(directory, `quotes.json`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // Combine the data with the id and contentHtml
    return JSON.parse(fileContents);
}
