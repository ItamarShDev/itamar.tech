import { ThemeList, ThemeSwitch } from "components/theme-list";
import { ThemedIconClient } from "components/themed-icon.client";
import { getCurrentTheme } from "lib/headers";
import type { Dictionary } from "translations";

interface ThemedIconProps {
	translations: Dictionary["header"];
}

export async function ThemedIcon({ translations }: ThemedIconProps) {
	const theme = await getCurrentTheme();
	const isDarkTheme = theme === "dark";
	return (
		<ThemedIconClient
			translations={translations}
			listComponent={<ThemeList currentThemeName={theme} />}
			switchComponent={
				<ThemeSwitch translations={translations} isDarkTheme={isDarkTheme} />
			}
		/>
	);
}
