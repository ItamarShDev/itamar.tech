/**
 * Calculates a match score based on the provided attributes and their rankings
 * @param attributes - Array of technology/skill names to calculate score for
 * @param rankings - Object containing technology rankings (defaults to imported JSON)
 * @returns The total match score
 */
export function calculateMatch(
	attributes: string[],
	rankings: Record<string, number> = {},
): number {
	return attributes.reduce((total, item) => {
		const itemRank = rankings[item];
		return itemRank !== undefined ? total + itemRank : total;
	}, 0);
}

/**
 * Determines a qualification text based on the match percentage
 * @param matchPercentage - The calculated match percentage (0-100)
 * @returns A string representing the qualification level
 */
export function getQualificationText(matchPercentage: number): string {
	switch (true) {
		case matchPercentage >= 90:
			return "Perfect Match!";
		case matchPercentage >= 70:
			return "Great Match!";
		case matchPercentage >= 50:
			return "Good Match";
		case matchPercentage >= 30:
			return "Fair Match";
		default:
			return "";
	}
}
