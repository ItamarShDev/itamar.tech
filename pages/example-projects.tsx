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
		{
			slug: "generator-traffic",
			title: "Generator Traffic",
			summary: "A simple example of a traffic cross app using generators.",
		},
	];
	return (
		<div>
			{examples.map((example) => (
				<LinkCard
					key={example.slug}
					route={`/example-projects/${example.slug}`}
					title={example.title}
					subTitle={example.summary}
				/>
			))}

			<LinkCard
				key={"hakapit"}
				newTab
				route={"https://hakapit.online"}
				title="הכפית"
				subTitle={"אתר פרטי לפודקאסט"}
			/>
		</div>
	);
}
