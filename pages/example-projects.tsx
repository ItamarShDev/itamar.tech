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
