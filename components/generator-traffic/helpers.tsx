export const IDS = [1, 2, 3] as const;
export const COLORS = ["red", "yellow", "green"] as const;
export const STATES: Record<(typeof IDS)[number], (typeof COLORS)[number]>[] = [
	{
		[IDS[0]]: COLORS[0],
		[IDS[1]]: COLORS[2],
		[IDS[2]]: COLORS[2],
	},
	{
		[IDS[0]]: COLORS[1],
		[IDS[1]]: COLORS[1],
		[IDS[2]]: COLORS[1],
	},
	{
		[IDS[0]]: COLORS[2],
		[IDS[1]]: COLORS[0],
		[IDS[2]]: COLORS[0],
	},
	{
		[IDS[0]]: COLORS[1],
		[IDS[1]]: COLORS[1],
		[IDS[2]]: COLORS[1],
	},
];
export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function* getTrafficLights() {
	let index = 0;
	while (true) {
		await sleep(3000);
		yield STATES[index];
		index = (index + 1) % STATES.length;
	}
}
