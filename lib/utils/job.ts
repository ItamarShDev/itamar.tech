import type { Job } from "lib/types/jobs";

/**
 * Filters an array of jobs based on search text
 * @param jobs - Array of job objects to filter
 * @param text - Search text to filter by (space or comma separated terms)
 * @returns Filtered array of jobs that match any of the search terms
 */
export function filterJobsByText(jobs: Job[], text = ""): Job[] {
	const searchTerms = text
		.split(/[\s,]+/)
		.map((term) => term.trim().toLowerCase())
		.filter(Boolean);

	if (searchTerms.length === 0) {
		return jobs.slice(0).reverse();
	}

	return jobs
		.slice(0)
		.reverse()
		.filter((job) => {
			const jobTitle = job.title.toLowerCase();
			const jobDescription = job.description.toLowerCase();
			const jobTags = job.tags.map((tag) => tag.toLowerCase());

			// If there are multiple search terms, the job must match at least one of them
			if (searchTerms.length > 1) {
				return searchTerms.some((term) => {
					const hasTag = jobTags.some((tag) => tag.includes(term));
					const hasTitle = jobTitle.includes(term);
					const hasDescription = jobDescription.includes(term);

					return hasTag || hasTitle || hasDescription;
				});
			}

			// For a single search term, the job must match it
			const term = searchTerms[0];
			const hasTag = jobTags.some((tag) => tag.includes(term));
			const hasTitle = jobTitle.includes(term);
			const hasDescription = jobDescription.includes(term);

			return hasTag || hasTitle || hasDescription;
		});
}

/**
 * Sorts jobs by date (newest first)
 * @param jobs - Array of job objects to sort
 * @returns New array of jobs sorted by date
 */
export function sortJobsByDate(jobs: Job[]): Job[] {
	return [...jobs].sort((a, b) => {
		const dateA = new Date(a.duration.to);
		const dateB = new Date(b.duration.to);
		return dateB.getTime() - dateA.getTime();
	});
}
