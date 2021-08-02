import { SocialRefs } from "components";

function AboutMe() {
    return (
        <div className="about-me">
            <div className="summary">
                <h1>Itamar.</h1>
                <h2>Software Engineer</h2>
                <p>
                    <i>Geek. Joker. Coder.</i>
                </p>
                <SocialRefs />
            </div>
            <style jsx>{`
                .about-me {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;
                }

                a {
                    font-size: 0.7em;
                }
                a:hover,
                a:focus,
                a:active {
                    text-decoration: underline;
                }

                @media screen and (max-width: 768px) {
                    .about-me {
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                    }
                }

                h4 {
                    letter-spacing: 0.1em;
                    margin-block-end: 0;
                }
            `}</style>
        </div>
    );
}

export default AboutMe;
