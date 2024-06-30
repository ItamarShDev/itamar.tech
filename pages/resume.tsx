import { Job } from "components";
import { FilterJobs } from "components/jobs/filter-jobs";
import { getAttributesData, getResumeData } from "lib/get-data-methods";
import { useIsRTL } from "lib/hooks/useTranslation";
import { filterJobsByText } from "lib/job-utils";
import type { Job as JobType } from "lib/types/jobs";
import { useEffect, useState } from "react";

export default function Resume({ resumeData }) {
	const isRTL = useIsRTL();
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
			<div className="timeline">
				{jobs.map((job) => (
					<Job
						key={`${job.duration.from} - ${job.duration.to} - ${job.company.name}`}
						job={job}
						updateFilterText={setFilterText}
					/>
				))}
			</div>
			<style jsx>{`
                .timeline {
                    display: grid;
                    grid-gap: 1.5rem;
                    line-height: 1.5rem;
                    -webkit-transition: all 0.4s ease;
                    transition: all 0.4s ease;
                    position: relative;
                    padding-inline-start: 2.2rem;
                    margin: 0 auto;
                }
                .timeline::before {
                    content: "";
                    width: 0.3rem;
                    height: 100%;
                    background: var(--colors-subText);
                    position: absolute;
                    top: 0;
                    left: ${isRTL ? "calc(100% - 0.5rem)" : "0.5rem"};
                    border-radius: 4rem 4rem;
                }
            `}</style>
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
