import { Job } from "components";
import { FilterJobs } from "components/jobs/filter-jobs";
import { getAttributesData, getResumeData } from "lib/get-data-methods";
import { filterJobsByText } from "lib/job-utils";
import type { Job as JobType } from "lib/types/jobs";
import { useEffect, useState } from "react";
import styles from "./Resume.module.css";

export default function Resume({ resumeData }) {
	const [filterText, setFilterText] = useState("");
	const [jobs, setJobs] = useState<JobType[]>(resumeData.jobs);
	useEffect(() => {
		const _jobs = filterJobsByText(resumeData.jobs, filterText);
		setJobs(_jobs);
	}, [filterText, resumeData]);

	return (
		<section>
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
		</section>
	);
}

export async function getStaticProps({ locale }) {
	const resumeData = await getResumeData(locale);
	const attributesData = await getAttributesData();
	return {
		props: {
			resumeData,
			attributesData,
			headerTitle: "Resume",
			title: "CV",
		},
	};
}
