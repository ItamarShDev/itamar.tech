"use client";
import { useEffect, useState, type CSSProperties } from "react";

import styles from "./HomeBackground.module.css";

type AuroraConfig = {
  className: string;
  translateX: [number, number];
  translateY: [number, number];
  scale: [number, number];
  rotate: [number, number];
  delay: [number, number];
  secondaryDelay?: [number, number];
};

type RangeSampler = (range: [number, number]) => number;

const AURORA_CONFIGS: AuroraConfig[] = [
  {
    className: styles.auroraLayer1,
    translateX: [-20, 20],
    translateY: [-15, 10],
    scale: [0.8, 1.15],
    rotate: [-90, 90],
    delay: [-6, 4],
    secondaryDelay: [-2, 2],
  },
  {
    className: styles.auroraLayer2,
    translateX: [-35, 25],
    translateY: [-20, 20],
    scale: [0.7, 1.1],
    rotate: [-120, 120],
    delay: [-10, 6],
    secondaryDelay: [-3, 3],
  },
  {
    className: styles.auroraLayer3,
    translateX: [-15, 30],
    translateY: [-10, 25],
    scale: [0.85, 1.25],
    rotate: [-60, 60],
    delay: [-8, 5],
    secondaryDelay: [-5, 4],
  },
  {
    className: styles.auroraLayer4,
    translateX: [-25, 35],
    translateY: [-25, 25],
    scale: [0.9, 1.35],
    rotate: [-180, 180],
    delay: [-12, 8],
    secondaryDelay: [-6, 6],
  },
];

const midpointSampler: RangeSampler = ([min, max]) => (min + max) / 2;

function randomBetween([min, max]: [number, number]) {
  return min + Math.random() * (max - min);
}

function createAuroraLayer(
  config: AuroraConfig,
  baseAngle: number,
  sampleRange: RangeSampler
) {
  const translateX = sampleRange(config.translateX);
  const translateY = sampleRange(config.translateY);
  const scale = sampleRange(config.scale);
  const rotate = baseAngle + sampleRange(config.rotate);
  const primaryDelay = sampleRange(config.delay);
  const secondaryDelay = sampleRange(config.secondaryDelay ?? config.delay);

  return {
    key: config.className,
    className: `${styles.auroraLayer} ${config.className}`,
    style: {
      animationDelay: `${primaryDelay.toFixed(2)}s, ${secondaryDelay.toFixed(2)}s`,
      transform: `translate3d(${translateX}%, ${translateY}%, 0) scale(${scale.toFixed(
        3
      )}) rotate(${rotate.toFixed(2)}deg)`,
    },
  };
}

export function HomeBackgroundAurora() {
  const [auroraLayers, setAuroraLayers] = useState(() =>
    AURORA_CONFIGS.map((config) => createAuroraLayer(config, 0, midpointSampler))
  );

  useEffect(() => {
    const baseAngle = Math.random() * 360;
    const randomSampler: RangeSampler = randomBetween;
    setAuroraLayers(
      AURORA_CONFIGS.map((config) => createAuroraLayer(config, baseAngle, randomSampler))
    );
  }, []);

  return (
    <div className={styles.auroraContainer}>
      {auroraLayers.map((layer) => (
        <div key={layer.key} className={layer.className} style={layer.style} />
      ))}
      <div className={styles.auroraNoise} />
    </div>
  );
}

type RadiantParticle = {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  scale: number;
  opacity: number;
  driftX: number;
  driftY: number;
};

const RADIANT_PARTICLE_COUNT = 20;

function createRadiantParticle(id: number): RadiantParticle {
  const duration = 18 + Math.random() * 16;
  const delay = -Math.random() * duration;
  const scale = 0.6 + Math.random() * 1.2;
  const opacity = 0.28 + Math.random() * 0.5;
  const driftRange = 28;

  return {
    id,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration,
    delay,
    scale,
    opacity,
    driftX: (Math.random() - 0.5) * driftRange,
    driftY: (Math.random() - 0.5) * driftRange,
  };
}

export function HomeBackgroundRadiant() {
  const [particles] = useState(() =>
    Array.from({ length: RADIANT_PARTICLE_COUNT }, (_, id) => createRadiantParticle(id))
  );

  return (
    <div className={styles.radiantContainer}>
      <div className={`${styles.radiantLayer} ${styles.radiantLayer1}`} />
      <div className={`${styles.radiantLayer} ${styles.radiantLayer2}`} />
      <div className={`${styles.radiantLayer} ${styles.radiantLayer3}`} />
      <div className={styles.radiantBeam} />
      <div className={styles.radiantGlow} />
      <div className={styles.radiantParticleField}>
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={styles.radiantParticle}
            style={
              {
                left: particle.left,
                top: particle.top,
                opacity: particle.opacity,
                animationDelay: `${particle.delay.toFixed(2)}s`,
                "--particleDuration": `${particle.duration.toFixed(2)}s`,
                "--driftX": `${particle.driftX.toFixed(2)}px`,
                "--driftY": `${particle.driftY.toFixed(2)}px`,
                "--particleScale": particle.scale.toFixed(2),
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

export function HomeBackgroundProfessional() {
  return (
    <div className={styles.professionalContainer}>
      <div className={styles.professionalBackdrop} />
      <div className={styles.professionalVignette} />
      <div className={styles.professionalGradient} />
      <div className={styles.professionalGrid} />
      <div className={styles.professionalSheen} />
      <div className={styles.professionalAccents}>
        <span className={`${styles.professionalAccent} ${styles.professionalAccentPrimary}`} />
        <span className={`${styles.professionalAccent} ${styles.professionalAccentSecondary}`} />
      </div>
      <div className={styles.professionalFocus}>
        <span className={`${styles.professionalFocusRing} ${styles.professionalFocusRingOuter}`} />
        <span className={`${styles.professionalFocusRing} ${styles.professionalFocusRingInner}`} />
      </div>
    </div>
  );
}

