"use client";

import { FilterJobs } from "app/[lang]/resume/jobs/filter-jobs";
import { Job } from "components";
import type { Job as JobType } from "lib/types/jobs";
import { filterJobsByText } from "lib/utils/job";
import { useState } from "react";
import styles from "./page.module.css";

export default function ResumeClient({
  initialJobs,
}: {
  initialJobs: JobType[];
}) {
  const [filterText, setFilterText] = useState("");
  const jobs = filterJobsByText(initialJobs, filterText);

  return (
    <>
      <FilterJobs
        filterText={filterText}
        jobs={jobs}
        updateFilterText={setFilterText}
      />
      <div className={styles.timeline} data-testid="resume-timeline">
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
