import { useEffect } from "react";
// @ts-ignore
import RankJson from "../../static-props/technologies.json";
import styles from "./MatchProgress.module.css";

function calculateMatch(attributes: string[]) {
	return attributes.reduce((ret, item) => {
		const itemRank = RankJson[item.toLowerCase()] as number;
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
}: {
	selectedSkills: string[];
	setQualificationText: React.Dispatch<React.SetStateAction<string>>;
	setPercentage: React.Dispatch<React.SetStateAction<number>>;
	percentage: number;
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
					color: `hsl(0, 0%, ${50 - percentage}%)`,
				}}
			>
				{percentage}% Match
			</div>
		</div>
	);
};

export default MatchProgress;
