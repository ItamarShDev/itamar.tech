"use client";

import type { Properties } from 'components/properties';
import { useEffect, useRef } from "react";
import { useFireworks } from "../../context/FireworksContext";
import { calculateMatch, getQualificationText } from "../../lib/utils/match";
import styles from "./MatchProgress.module.css";

const MatchProgress = ({
  selectedSkills,
  setQualificationText,
  setPercentage,
  percentage,
  properties,
}: {
  selectedSkills: string[];
  setQualificationText: React.Dispatch<React.SetStateAction<string>>;
  setPercentage: React.Dispatch<React.SetStateAction<number>>;
  percentage: number;
  properties: Properties;
}) => {
  const { toggleFireworks } = useFireworks();
  const hasTriggeredFireworks = useRef(false);

  useEffect(() => {
    const newPercentage = calculateMatch(selectedSkills, properties);
    setQualificationText(getQualificationText(newPercentage));
    const boundedPercentage = Math.min(100, newPercentage);
    setPercentage(boundedPercentage);

    // Trigger fireworks when crossing 80% threshold
    if (boundedPercentage >= 80 && !hasTriggeredFireworks.current) {
      hasTriggeredFireworks.current = true;
      toggleFireworks();
    }

    // Reset the trigger if percentage drops below 80%
    if (boundedPercentage < 80) {
      hasTriggeredFireworks.current = false;
    }
  }, [properties, selectedSkills, setPercentage, setQualificationText, toggleFireworks]);

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
