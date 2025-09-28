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
	return { success: true, message: theme };
}

export async function toggleDarkTheme() {
	const theme = await getCurrentTheme();
	const newTheme = theme === "dark" ? "light" : "dark";
	await setCurrentTheme(newTheme);
	return newTheme;
}
