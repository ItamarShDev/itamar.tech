"use client";

import MatchCalculator from "components/match-finder/match-calculator";
import Modal from "components/modal";
import { useFireworks } from "context/FireworksContext";
import { useEffect, useState } from "react";
import { useTranslation } from "translations/hooks";
import styles from "./FloatingButton.module.css";
import { useProperties } from "./properties";

function MatchModal(props: {
	open: boolean;
	setOpened: (opened: boolean) => void;
	title: string;
}) {
	const properties = useProperties();
	if (!properties) return null;
	return (
		<Modal
			open={props.open}
			setOpened={props.setOpened}
			title={props.title}
			refreshOnRender
		>
			<MatchCalculator properties={properties} />
		</Modal>
	);
}

function FloatingButton() {
	const [opened, setOpened] = useState(false);
	const { showFireworks, toggleFireworks } = useFireworks();
	const { translations: matchFinderTranslations } =
		useTranslation("match_finder");

	const modalTitle = matchFinderTranslations?.modalTitle || "Are we a match?";

	const openModal = () => {
		setOpened(!opened);
	};

	// Disable fireworks when modal is closed
	useEffect(() => {
		if (!opened && showFireworks) {
			toggleFireworks();
		}
	}, [opened, showFireworks, toggleFireworks]);

	return (
		<div className={styles.container} title={modalTitle}>
			<button
				type="button"
				className={styles.floatingButton}
				onClick={openModal}
				aria-label={modalTitle}
				aria-expanded={opened}
			>
				<svg
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					aria-hidden="true"
				>
					<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6Z" />
				</svg>
			</button>
			<MatchModal open={opened} setOpened={setOpened} title={modalTitle} />
		</div>
	);
}

export default FloatingButton;
