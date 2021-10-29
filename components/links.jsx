import { LinkCard } from "components";

function Links() {
    return (
        <div>
            <LinkCard
                route="/resume"
                title="Resume"
                subTitle="Resume Timeline"
            />
            <LinkCard
                route="/blog"
                title="Thoughts Log"
                subTitle="My Development Journy"
            />
            <LinkCard
                route="/example-projects"
                title="Examples"
                subTitle="Project examples recreated"
            />
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: row;
                }
                @media only screen and (max-width: 968px) {
                    div {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
}

export default Links;
