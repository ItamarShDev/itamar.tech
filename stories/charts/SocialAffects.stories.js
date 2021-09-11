import Social, { socialData } from "components/charts/social";
import HOC from "stories/story-hoc";
const Comp = (props) => HOC(Social, props);
export const Full = Comp.bind({});
export const Empty = Comp.bind({});

Full.args = socialData;
Empty.args = {};
export default {
    title: "Charts/SocialAffects",
    component: Social,
};
