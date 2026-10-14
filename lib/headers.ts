"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Theme } from "providers/theme";

export async function getCurrentLang(): Promise<string> {
	return "en";
}

export async function getCurrentTheme() {
	const cookieCache = await cookies();
	const theme = cookieCache.get("current-theme")?.value || "light";
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
