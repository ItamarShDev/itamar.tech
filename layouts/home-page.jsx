import { AboutMe, Avatar, Links, Stats } from "components";
import FloatingButton from "components/floating-button";
import { useTrackVisibility } from "lib/hooks";
import React from "react";
export default function HomePage({ quotes }) {
	const [ref, { isVisible, wasEverVisible }] = useTrackVisibility();
	const showStats = isVisible || wasEverVisible;
	return (
		<>
			<article>
				<section className="image">
					<Avatar />
				</section>
				<section className="about-me">
					<AboutMe quotes={quotes} />
				</section>
				<section className="stats" ref={ref}>
					{showStats && <Stats />}
				</section>
				<section className="links">
					<Links />
				</section>
				<footer>
					<FloatingButton />
				</footer>
			</article>
			<style jsx>
				{`
                    article {
                        display: grid;
                        height: calc(100vh - var(--header-height));
                        grid-template-rows: 1fr 1fr 1fr 0;
                        grid-template-columns: 2fr 3fr;
                        grid-template-areas: "image about-me" "image links" "image stats" "footer footer";
                    }

                    section {
                        padding: 2rem 0;
                    }
                    .image {
                        grid-area: image;
                        display: block;
                        height: 100%;
                    }
                    .about-me {
                        grid-area: about-me;
                        display: block;
                    }
                    .links {
                        grid-area: links;
                    }

                    .stats {
                        grid-area: stats;
                    }
                    footer {
                        grid-area: footer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    @media only screen and (max-width: 968px) {
                        article {
                            grid-template-areas: "image about-me" "image links" "stats stats" "footer footer";
                        }
                    }

                    @media only screen and (max-width: 512px) {
                        article {
                            grid-template-areas: "image about-me" "links links" "stats stats" "footer footer";
                        }
                    }
                `}
			</style>
		</>
	);
}
