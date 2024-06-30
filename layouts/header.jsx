import Link from "next/link";
import GithubLogo from "../components/icons/github";
import { ThemedIcon } from "../components/themed-icon";

import LanguageSelector from "../components/language-selector";

const Header = (props) => {
	const { title } = props;
	return (
		<nav>
			<GithubLogo />
			<Link href="/" legacyBehavior>
				{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
				<a title="Click to go home">
					<span className="name">Itamar Sharify</span>
					{title && <span className="divider">&nbsp;&nbsp;›&nbsp;&nbsp;</span>}
					<span className="title">{title}</span>
				</a>
			</Link>
			<LanguageSelector />
			<ThemedIcon />
			<style jsx>{`
                nav {
                    height: var(--header-height);
                    width: 100%;
                    display: grid;
                    grid-template-columns: 6rem 1fr 6rem 6rem;
                    text-align: center;
                    align-items: center;
                    border-bottom: 1px solid var(--colors-decorations);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    background-color: var(--colors-bg);
                }
                .divider {
                    color: var(--colors-header);
                }
                .name {
                    font-size: 2em;
                    font-weight: 400;
                    color: var(--colors-headerText);
                }
                .title {
                    font-size: 1.5em;
                    font-family: cascadia, serif;
                    color: var(--colors-headerText);
                    font-style: italic;
                }
                .github-link {
                    display: flex;
                    align-items: stretch;
                    justify-content: center;
                    flex-direction: column;
                    height: 6rem;
                    width: 6rem;
                    cursor: default;
                }
                a {
                    text-decoration: none;
                }
            `}</style>
		</nav>
	);
};

export default Header;
