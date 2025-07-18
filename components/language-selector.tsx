"use client";
import { Switch } from "components/switch";
import { getRoute as getRouteUtil } from "lib/utils/routing";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./LanguageSelector.module.css";

export function useLocales() {
	const pathname = usePathname();
	const { replace, refresh } = useRouter();
	const params = useParams<{ lang: string }>();
	// Wrapper function to maintain the same interface as before
	const getRoute = (locale?: string) => {
		return getRouteUtil(pathname || '/', locale);
	};

	const goToNextLocale = () => {
		replace(getRoute(), { scroll: false });
		refresh();
	};

	const goToLocale = (locale: string) => {
		replace(`/${locale}`, { scroll: false });
		refresh();
	};

	return { goToNextLocale, goToLocale, getRoute, lang: params?.lang };
}

export default function LanguageSelector() {
	const { goToNextLocale, lang } = useLocales();
	useEffect(() => {
		document.body.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
	}, [lang]);
	return (
		<nav className={styles.nav}>
			<Switch
				id="language-selector"
				checked={lang === "en"}
				onChange={() => goToNextLocale()}
				selectedText={"En"}
				unselectedText={"עב"}
			/>
		</nav>
	);
}
