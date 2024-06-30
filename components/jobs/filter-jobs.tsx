import { Input } from "components/input";
import type { Job } from "lib/types/jobs";
import type { InputChangeEvent } from "lib/types/react";
import { useEffect, useState } from "react";

type Props = {
	jobs: Job[];
	updateFilterText: (filterText: string) => void;
	filterText: string;
};
export function FilterJobs({ jobs, updateFilterText, filterText }: Props) {
	const [resultCount, setResultCount] = useState(null);
	useEffect(() => {
		if (filterText) {
			setResultCount(jobs.length);
		} else {
			setResultCount(null);
		}
	}, [filterText, jobs]);

	const filterJobs = (e: InputChangeEvent) => {
		const text = e.target.value;
		updateFilterText(text);
	};
	return (
		<div className="container">
			<Input
				label="Filter jobs"
				className="job-filter"
				type="text"
				value={filterText}
				onChange={filterJobs}
				autoComplete="off"
			>
				<span className="results">
					{resultCount > 0 && `${resultCount} results found`}
				</span>
			</Input>

			<style jsx>
				{`
                    .results {
                        color: gray;
                        font-style: italic;
                        font-size: 1rem;
                        height: 2rem;
                        line-height: 2rem;
                        padding-inline-start: 2rem;
                    }
                `}
			</style>
		</div>
	);
}
