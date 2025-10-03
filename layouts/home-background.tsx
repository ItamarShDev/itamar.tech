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

function randomBetween([min, max]: [number, number]) {
	return min + Math.random() * (max - min);
}


export function HomeBackgroundAurora() {
	const baseAngle = Math.random() * 360;
	return (
		<div className={styles.auroraContainer}>
			{AURORA_CONFIGS.map((config, index) => {
				const translateX = randomBetween(config.translateX);
				const translateY = randomBetween(config.translateY);
				const scale = randomBetween(config.scale);
				const rotate = baseAngle + randomBetween(config.rotate);
				const primaryDelay = randomBetween(config.delay);
				const secondaryDelay = config.secondaryDelay
					? randomBetween(config.secondaryDelay)
					: randomBetween(config.delay);
				const animationDelay = `${primaryDelay.toFixed(2)}s, ${secondaryDelay.toFixed(2)}s`;
				return (
					<div
						key={config.className}
						className={`${styles.auroraLayer} ${config.className}`}
						style={{
							animationDelay,
							transform: `translate3d(${translateX}%, ${translateY}%, 0) scale(${scale.toFixed(3)}) rotate(${rotate.toFixed(2)}deg)`,
						}}
					/>
				);
			})}
			<div className={styles.auroraNoise} />
		</div>
	);
}