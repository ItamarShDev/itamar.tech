import Abilities from "components/charts/abilities";
import HOC from "stories/story-hoc";
const Comp = (props) => HOC(Abilities, props);
export const Full = Comp.bind({});
export const Empty = Comp.bind({});
const labels = ["Python", "Node.js", "Javascript", "CSS", "React.js"];
const values = [{ title: "Abilities", values: [70, 30, 90, 90, 80] }];

Full.args = { labels, values };
Empty.args = {};
export default {
    title: "Charts/Abilities",
    component: Abilities,
};
