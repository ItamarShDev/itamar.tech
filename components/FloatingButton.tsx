import MatchCalculator from "components/match-finder/match-calculator";
import Modal from "components/modal";
import { useState } from "react";
import Json from "../static-props/technologies.json";
import styles from "./FloatingButton.module.css";

function MatchModal(props) {
	return (
		<Modal
			open={props.open}
			setOpened={props.setOpened}
			title="Are we a match?"
			refreshOnRender
		>
			<MatchCalculator properties={Json} />
		</Modal>
	);
}

function FloatingButton() {
	const [opened, setOpened] = useState(false);
	const openModal = () => {
		setOpened(!opened);
	};
	return (
		<div className={styles.container} title="Are we a match?">
			<button
				type="button"
				className={styles.floatingButton}
				onClick={openModal}
			>
				?
			</button>
			<MatchModal open={opened} setOpened={setOpened} />
		</div>
	);
}

export default FloatingButton;
