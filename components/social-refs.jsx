import GithubLogo from "images/GithubLogo";
import MediumLogo from "images/MediumLogo";
import TwitterLogo from "images/TwitterLogo";
import { grid } from "theme/styles";

function SocialRefs({ withTitle = false }) {
	const { className: gridClass, styles: gridStyle } = grid({
		rows: 1,
		cols: 2,
		gap: 20,
	});

	return (
		<div className="row">
			{withTitle && <h5>Feel free to contact me here:</h5>}
			<div className={`${gridClass} refs`}>
				<a
					className="item twitter"
					href="https://twitter.com/ISharify"
					target="_blank"
					rel="noreferrer noopener"
					title="Twitter"
				>
					<TwitterLogo />
				</a>
				<a
					className="item github"
					href="https://www.github.com/ItamarShDev"
					target="_blank"
					rel="noreferrer noopener"
					title="Github"
				>
					<GithubLogo />
				</a>

				{gridStyle}
			</div>
			<style jsx>{`
                .item {
                    background-size: 30px;
                    height: 30px;
                    margin: 0 5px;
                    font-size: 0;
                    width: 30px;
                }
                .refs {
                    justify-content: start;
                }
                @media screen and (max-width: 768px) {
                    .refs {
                        justify-content: center;
                    }
                }
            `}</style>
		</div>
	);
}

export default SocialRefs;
