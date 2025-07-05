"use server";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import type { Theme } from "providers/theme";
export async function getCurrentLang() {
	const headersList = await headers();
	const pathname = headersList.get("x-current-path") || "";

	// Extract language from URL path (/en/... or /he/...)
	const lang = pathname.split("/")[1];
	return lang || "en"; // default to 'en' if no language found
}

export async function getCurrentTheme() {
	const cookieCache = await cookies();
	const theme = cookieCache.get("current-theme")?.value || "dark";
	return theme as Theme;
}

export async function setCurrentTheme(theme: string) {
	const cookieCache = await cookies();
	cookieCache.set("current-theme", theme);
	revalidatePath("/", "layout");
	return theme;
}

export async function toggleDarkTheme() {
	const theme = await getCurrentTheme();
	const newTheme = theme === "dark" ? "light" : "dark";
	await setCurrentTheme(newTheme);
	return newTheme;
}

export async function getClientCountry() {
	const headersList = await headers();
	
	// Try to get country from various headers
	const country = 
		headersList.get("x-vercel-ip-country") ||
		headersList.get("cf-ipcountry") ||
		headersList.get("x-country-code") ||
		headersList.get("x-forwarded-for-country") ||
		null;
	
	return country;
}

export async function isIndependenceDay(date = new Date()) {
	// Check if it's July 4th
	return date.getMonth() === 6 && date.getDate() === 4;
}

export async function shouldShowFireworks() {
	const headersList = await headers();
	
	// Allow manual override for testing
	const forceFireworks = headersList.get("x-force-fireworks") === "true";
	if (forceFireworks) {
		return true;
	}
	
	const country = await getClientCountry();
	const isUS = country === "US";
	const isJuly4th = await isIndependenceDay();
	
	return isUS && isJuly4th;
}
