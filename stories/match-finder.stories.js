import MatchCalculator from "components/match-finder/match-calculator";
import HOC from "stories/story-hoc";
import json from "../static-props/technologies.json";

const Comp = (props) => HOC(MatchCalculator, props);
export const MatchFinderComp = Comp.bind({});
MatchFinderComp.args = { properties: json };
const story = {
    title: "Components/Match Calculator",
    component: MatchCalculator,
    decorators: [
        (Story) => (
            <div style={{ width: `200px` }}>
                <Story />
            </div>
        ),
    ],
};
export default story;
