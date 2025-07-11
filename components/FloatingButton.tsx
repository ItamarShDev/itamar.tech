"use client";

import MatchCalculator from "components/match-finder/match-calculator";
import Modal from "components/modal";
import { useFireworks } from 'context/FireworksContext';
import { useEffect, useRef, useState } from "react";
import styles from "./FloatingButton.module.css";
import { type Properties } from "./properies";

function MatchModal(props: { open: boolean; setOpened: (opened: boolean) => void; properties?: Properties }) {
  if (!props.properties) {
    return (
      <Modal
        open={props.open}
        setOpened={props.setOpened}
        title="Are we a match?"
        refreshOnRender
      >
        <div>Loading...</div>
      </Modal>
    );
  }

  return (
    <Modal
      open={props.open}
      setOpened={props.setOpened}
      title="Are we a match?"
      refreshOnRender
    >
      <MatchCalculator properties={props.properties} />
    </Modal>
  );
}

const EMOJIS = ["🤩", "🫶", "🫵", "👋", "🙏🏼"];
function useRandomEmoji() {
  const [emoji, setEmoji] = useState("🤩");
  const indexRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % EMOJIS.length;
      setEmoji(EMOJIS[indexRef.current]);
    }, 5000);
    return () => clearInterval(interval);
  });
  return emoji;
}

function FloatingButton() {
  const [opened, setOpened] = useState(false);
  const emoji = useRandomEmoji();
  const { showFireworks, toggleFireworks } = useFireworks();

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
    <div className={styles.container} title="Are we a match?">
      <button
        type="button"
        className={styles.floatingButton}
        onClick={openModal}
        key={emoji}
      >
        {emoji}
      </button>
      <MatchModal open={opened} setOpened={setOpened} />
    </div>
  );
}

export default FloatingButton;
