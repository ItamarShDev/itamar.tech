import PropTypes from "prop-types";
import { useEffect } from "react";
// @ts-ignore
import RankJson from "../../static-props/technologies.json";
import styles from "./MatchProgress.module.css";

/**
 * @param {ArrayLike<any>} attributes
 */
function calculateMatch(attributes) {
	return Array.from(attributes).reduce((ret, item) => {
		const itemRank = RankJson[item.toLowerCase()];
		if (itemRank !== undefined) {
			return ret + itemRank;
		}
		return ret;
	}, 0);
}

/**
 * @param {number} percentage
 */
function getQualificationText(percentage) {
	if (percentage === 0) return "";
	if (percentage < 15) {
		return "Possibly under qualified :(";
	}
	if (percentage >= 90) {
		return "Seems like we're done here";
	}
	return "We're getting there!";
}

const MatchProgress = ({
	selectedSkills,
	setQualificationText,
	setPercentage,
	percentage,
}) => {
	useEffect(() => {
		const newPercentage = calculateMatch(selectedSkills);
		setQualificationText(getQualificationText(newPercentage));
		const boundedPercentage = Math.min(100, newPercentage);
		setPercentage(boundedPercentage);
	}, [selectedSkills, setPercentage, setQualificationText]);
	return (
		<div className={styles.progress}>
			<div
				className={styles.range}
				style={{
					width: `${percentage}%`,
					backgroundColor: `hsl(${percentage}, 100%, 50%)`,
					color: `hsl(0, 0%, ${100 - percentage}%)`,
				}}
			>
				{percentage}% Match
			</div>
		</div>
	);
};

MatchProgress.propTypes = {
	attributes: PropTypes.arrayOf(PropTypes.string),
};

export default MatchProgress;
