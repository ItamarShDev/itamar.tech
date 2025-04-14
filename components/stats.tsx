import Abilities from "components/charts/abilities";
import SocialAffect from "components/charts/social";
import styles from "./Stats.module.css";

function Stats() {
	return (
		<div>
			<div className={styles.flex}>
				<span>
					<Abilities />
				</span>
				<span>
					<SocialAffect />
				</span>
			</div>
		</div>
	);
}

export default Stats;
