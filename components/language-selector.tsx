"use client";
import { Switch } from "components/switch";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
	const { replace, refresh } = useRouter();
	const pathname = usePathname();
	const params = useParams<{ lang: string }>();
	const route = () => {
		const pathnames = pathname?.split("/");

		if (!pathnames) {
			return `/${params?.lang}`;
		}
		if (pathnames?.[1] === "he") {
			pathnames[1] = "en";
		} else {
			pathnames[1] = "he";
		}
		return pathnames.join("/");
	};
	useEffect(() => {
		document.body.setAttribute("dir", params?.lang === "en" ? "ltr" : "rtl");
	}, [params?.lang]);
	return (
		<nav className={styles.nav}>
			<Switch
				id="language-selector"
				checked={params?.lang === "en"}
				onChange={() => {
					replace(route(), { scroll: false });
					refresh();
				}}
				selectedText={"En"}
				unselectedText={"עב"}
			/>
		</nav>
	);
}
