"use client";

import { FilterJobs } from "app/[lang]/resume/jobs/filter-jobs";
import { Job } from "components";
import { filterJobsByText } from "lib/job-utils";
import type { Job as JobType } from "lib/types/jobs";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function ResumeClient({
	initialJobs,
}: { initialJobs: JobType[] }) {
	const [filterText, setFilterText] = useState("");
	const [jobs, setJobs] = useState<JobType[]>(
		initialJobs.toSorted(
			(a, b) =>
				new Date(b.duration.from).getTime() -
				new Date(a.duration.from).getTime(),
		),
	);
	useEffect(() => {
		const _jobs = filterJobsByText(initialJobs, filterText);
		setJobs(_jobs);
	}, [filterText, initialJobs]);

	return (
		<>
			<FilterJobs
				filterText={filterText}
				jobs={jobs}
				updateFilterText={setFilterText}
			/>
			<div className={styles.timeline}>
				{jobs.map((job) => (
					<Job
						key={`${job.duration.from} - ${job.duration.to} - ${job.company.name}`}
						job={job}
						filterText={filterText}
						updateFilterText={setFilterText}
					/>
				))}
			</div>
		</>
	);
}
