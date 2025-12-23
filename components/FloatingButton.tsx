"use client";

import MatchCalculator from "components/match-finder/match-calculator";
import Modal from "components/modal";
import { useFireworks } from 'context/FireworksContext';
import { useRandomEmoji } from "lib/hooks/useRandomEmoji";
import { useEffect, useState } from "react";
import { useTranslation } from "translations/hooks";
import styles from "./FloatingButton.module.css";
import { useProperties } from "./properties";

function MatchModal(props: { open: boolean; setOpened: (opened: boolean) => void; title: string }) {
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
  const emoji = useRandomEmoji();
  const { showFireworks, toggleFireworks } = useFireworks();
  const { translations: matchFinderTranslations } = useTranslation('match_finder');

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
        key={emoji}
      >
        {emoji}
      </button>
      <MatchModal open={opened} setOpened={setOpened} title={modalTitle} />
    </div>
  );
}

export default FloatingButton;
