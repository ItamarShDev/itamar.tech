import { ThemeList, ThemeSwitch } from "components/theme-list";
import { ThemedIconClient } from "components/themed-icon.client";
import type { Dictionary } from "translations";

interface ThemedIconProps {
	translations: Dictionary["header"];
}

export async function ThemedIcon({ translations }: ThemedIconProps) {
	return (
		<ThemedIconClient
			translations={translations}
			listComponent={<ThemeList />}
			switchComponent={<ThemeSwitch translations={translations} />}
		/>
	);
}
