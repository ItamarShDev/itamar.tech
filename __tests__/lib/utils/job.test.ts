import { describe, expect, test } from "bun:test";
import type { Job } from "lib/types/jobs";
import { filterJobsByText, sortJobsByDate } from "lib/utils/job";

const mockJobs: Job[] = [
	{
		title: "Senior Frontend Developer",
		description: "Building modern web applications with React and TypeScript",
		duration: {
			from: new Date("2020-01-01").getTime(),
			to: new Date("2022-12-31").getTime(),
		},
		company: {
			logo: "https://techcorp.com/logo.png",
			name: "Tech Corp",
			website: "https://techcorp.com",
		},
		tags: ["React", "TypeScript", "Frontend"],
	},
	{
		title: "Backend Engineer",
		description: "Building scalable APIs with Node.js",
		duration: {
			from: new Date("2023-01-01").getTime(),
			to: new Date("2023-12-31").getTime(),
		},
		company: {
			logo: "https://apimasters.com/logo.png",
			name: "API Masters",
			website: "https://apimasters.com",
		},
		tags: ["Node.js", "API", "Backend"],
	},
	{
		title: "Full Stack Developer",
		description: "Working on both frontend and backend with React and Node.js",
		duration: {
			from: new Date("2021-06-01").getTime(),
			to: new Date("2023-06-30").getTime(),
		},
		company: {
			logo: "https://fullstack.io/logo.png",
			name: "FullStack Inc",
			website: "https://fullstack.io",
		},
		tags: ["React", "Node.js", "Fullstack"],
	},
];

describe("Job Utilities", () => {
	describe("filterJobsByText", () => {
		test("returns all jobs when search text is empty", () => {
			const result = filterJobsByText(mockJobs, "");
			expect(result).toHaveLength(mockJobs.length);
			expect(result[0].title).toBe("Full Stack Developer"); // Should be reversed
		});

		test("filters jobs by title", () => {
			const result = filterJobsByText(mockJobs, "Backend");
			// Should match both 'Backend Engineer' and 'Full Stack Developer' (which has 'backend' in description)
			expect(result).toHaveLength(2);
			const titles = result.map((job) => job.title);
			expect(titles).toContain("Backend Engineer");
			expect(titles).toContain("Full Stack Developer");
		});

		test("filters jobs by description", () => {
			const result = filterJobsByText(mockJobs, "modern web");
			expect(result).toHaveLength(1);
			expect(result[0].title).toBe("Senior Frontend Developer");
		});

		test("filters jobs by tags", () => {
			const result = filterJobsByText(mockJobs, "React");
			expect(result).toHaveLength(2);
			expect(result[0].title).toBe("Full Stack Developer");
			expect(result[1].title).toBe("Senior Frontend Developer");
		});

		test("handles multiple search terms", () => {
			const result = filterJobsByText(mockJobs, "React, Node.js");
			expect(result).toHaveLength(3); // All jobs match at least one term
		});

		test("is case insensitive", () => {
			const result = filterJobsByText(mockJobs, "react");
			expect(result).toHaveLength(2);
			expect(result[0].title).toBe("Full Stack Developer");
		});
	});

	describe("sortJobsByDate", () => {
		test("sorts jobs by end date in descending order", () => {
			const result = sortJobsByDate(mockJobs);
			expect(result[0].title).toBe("Backend Engineer"); // 2023-12-31
			expect(result[1].title).toBe("Full Stack Developer"); // 2023-06-30
			expect(result[2].title).toBe("Senior Frontend Developer"); // 2022-12-31
		});
	});
});
