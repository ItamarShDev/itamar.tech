import ChartsCommunicationExample from "example-projects/ChartsCommunication";
import HOC from "stories/story-hoc";

const Comp = (props) => HOC(ChartsCommunicationExample, props);
export const MatchFinderComp = Comp.bind({});
const story = {
    title: "Examples/Chart Communication",
    component: ChartsCommunicationExample,
};
export default story;
