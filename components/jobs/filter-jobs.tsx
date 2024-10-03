import { Input } from "components/input";
import type { Job } from "lib/types/jobs";
import type { InputChangeEvent } from "lib/types/react";
import { useEffect, useState } from "react";
import styles from "./FilterJobs.module.css";

type Props = {
	jobs: Job[];
	updateFilterText: (filterText: string) => void;
	filterText: string;
};
export function FilterJobs({ jobs, updateFilterText, filterText }: Props) {
	const [resultCount, setResultCount] = useState<number>(0);
	useEffect(() => {
		if (filterText) {
			setResultCount(jobs.length);
		} else {
			setResultCount(0);
		}
	}, [filterText, jobs]);

	const filterJobs = (e: InputChangeEvent) => {
		const text = e.target.value;
		updateFilterText(text);
	};

	const hasResults = resultCount > 0;
	return (
		<div>
			<Input
				label="Filter jobs"
				className="job-filter"
				type="text"
				value={filterText}
				onChange={filterJobs}
				autoComplete="off"
			>
				<span className={styles.results}>
					{hasResults && `${resultCount} results found`}
				</span>
			</Input>
		</div>
	);
}
