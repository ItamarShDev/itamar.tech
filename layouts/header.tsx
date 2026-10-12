import PortfolioHeader from "components/portfolio/header";
import { getCurrentLang } from "lib/headers";
import { getTranslationsCache } from "lib/server-cache";
export default async function Header() {
	const [lang, copy] = await Promise.all([
		getCurrentLang(),
		getTranslationsCache("portfolio"),
	]);
	return <PortfolioHeader lang={lang} copy={copy} />;
}
