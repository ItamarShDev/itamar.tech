import { LinkCard } from "components";
type Example = {
    title: string;
    summary: string;
    slug: string;
};
export default function ExampleProjects() {
    const examples: Example[] = [
        {
            slug: "charts-communications",
            title: "Chart Communications",
            summary: "A simple example of a chart communications app.",
        },
    ];
    return (
        <div>
            {examples.map((example, index) => (
                <LinkCard
                    key={index}
                    routeRef="/example-projects/[slug]"
                    route={`/example-projects/${example.slug}`}
                    title={example.title}
                    subTitle={example.summary}
                />
            ))}
            <LinkCard
                key={"mayeshbeze"}
                route={`https://mayeshbeze.tech`}
                title={"מה יש בזה?"}
                subTitle={"אתר פרטי לפודקאסט"}
            />
            <LinkCard
                key={"hakapit"}
                route={`https://hakapit.tech`}
                title="הכפית"
                subTitle={"אתר פרטי לפודקאסט"}
            />
        </div>
    );
}
