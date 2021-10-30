import RandomQuotes from "components/floating-quotes";
import HOC from "stories/story-hoc";
import json from "../static-props/quotes.json";
const Comp = (props) => HOC(RandomQuotes, props);
export const FloatingQuotesComp = Comp.bind({});
FloatingQuotesComp.args = { quotes: json };
const story = {
    title: "Components/Floating Quotes",
    component: RandomQuotes,
};
export default story;
