import PropTypes from "prop-types";
// @ts-ignore
import RankJson from "../../static-props/technologies.json";
import { useEffect } from "react";

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
    }, [selectedSkills, percentage]);
    return (
        <div className="progress">
            <div className="range">{percentage}% Match</div>

            <style jsx>{`
                .progress {
                    position: relative;
                    height: 2rem;
                    width: inherit;
                    border-radius: 0 0 1rem 1rem;
                    font-size: 1rem;
                    line-height: 2rem;
                    overflow: hidden;
                }

                .range {
                    width: ${percentage}%;
                    height: inherit;
                    color: hsl(0, 0%, ${100 - percentage}%);
                    text-overflow: clip;
                    text-align: center;
                    overflow: hidden;
                    background-color: hsl(${percentage}, 100%, 50%);
                    transition: width 0.2s linear;
                }
                .match-text {
                    font-style: italic;
                    color: var(--colors-text);
                }
            `}</style>
        </div>
    );
};

MatchProgress.propTypes = {
    attributes: PropTypes.arrayOf(PropTypes.string),
};

export default MatchProgress;
