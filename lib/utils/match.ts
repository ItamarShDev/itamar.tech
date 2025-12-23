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

export interface QualificationTranslations {
	perfect?: string;
	great?: string;
	good?: string;
	fair?: string;
}

const defaultQualifications: QualificationTranslations = {
	perfect: "Perfect Match!",
	great: "Great Match!",
	good: "Good Match",
	fair: "Fair Match",
};

/**
 * Determines a qualification text based on the match percentage
 * @param matchPercentage - The calculated match percentage (0-100)
 * @param translations - Optional translations for qualification texts
 * @returns A string representing the qualification level
 */
export function getQualificationText(
	matchPercentage: number,
	translations?: QualificationTranslations,
): string {
	const qualifications = translations || defaultQualifications;

	switch (true) {
		case matchPercentage >= 90:
			return qualifications.perfect || defaultQualifications.perfect!;
		case matchPercentage >= 70:
			return qualifications.great || defaultQualifications.great!;
		case matchPercentage >= 50:
			return qualifications.good || defaultQualifications.good!;
		case matchPercentage >= 30:
			return qualifications.fair || defaultQualifications.fair!;
		default:
			return "";
	}
}
