import FloatingQuotes from "components/floating-quotes";
import HOC from "stories/story-hoc";
import json from "../static-props/quotes.json";
const Comp = (props) => HOC(FloatingQuotes, props);
export const FloatingQuotesComp = Comp.bind({});
FloatingQuotesComp.args = { quotes: json };
export default {
    title: "Components/Floating Quotes",
    component: FloatingQuotes,
    decorators: [
        (Story) => (
            <div style={{ width: `200px` }}>
                <Story />
            </div>
        ),
    ],
};
