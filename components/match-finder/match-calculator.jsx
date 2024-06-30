import Fireworks from "components/match-finder/fireworks";
import MatchProgress from "components/match-finder/match-progress";
import PropertiesSelect from "components/match-finder/properties-select";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import CallMe from "./call-me";
MatchCalculator.propTypes = {
	jobs: PropTypes.arrayOf(PropTypes.string),
	properties: PropTypes.object,
};

function MatchCalculator({ properties }) {
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [qualificationText, setQualificationText] = useState("");
	const [percentage, setPercentage] = useState(0);

	return (
		<div>
			<section>
				<PropertiesSelect
					setSelectedSkills={setSelectedSkills}
					qualificationText={qualificationText}
					properties={properties}
				/>
				<MatchProgress
					selectedSkills={selectedSkills}
					setQualificationText={setQualificationText}
					percentage={percentage}
					setPercentage={setPercentage}
				/>
			</section>
			<section>
				<Fireworks percentage={percentage} />
				{percentage >= 90 && <CallMe />}
			</section>
			<style jsx>{`
                div {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    margin: 0.5rem;
                }
            `}</style>
		</div>
	);
}

export default MatchCalculator;
