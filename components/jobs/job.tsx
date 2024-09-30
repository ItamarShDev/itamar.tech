import { Tags } from "components/jobs/tags";
import { useIsRTL } from "lib/hooks/useTranslation";
import type { Job as JobType } from "lib/types/jobs";
import styles from "./Job.module.css";

type Props = {
	job: JobType;
	updateFilterText: (filterText: string) => void;
	filterText?: string;
};

export default function Job({ job, updateFilterText, filterText }: Props) {
	const isRTL = useIsRTL();
	const tags = job.tags.join(", ");
	return (
		<dl className={`${styles.jobContainer} ${isRTL ? styles.rtl : ""}`}>
			<dt className={styles.duration}>
				{job?.duration?.from} - {job?.duration?.to}
			</dt>
			<dd className={styles.box}>
				<div className={styles.job}>
					<h3 className={styles.title}>{job.title}</h3>
					<span className={styles.company}>
						<a
							href={job.company.website}
							target="_blank"
							rel="noreferrer noopener"
						>
							{job.company.name}
						</a>
					</span>
				</div>
				<div className={styles.summary}>
					<p>
						{job.description.split("\n").map((text, idx) => (
							<span key={text}>{text}</span>
						))}
					</p>
				</div>
				<div className={styles.extra}>
					<p>
						{job.elaborated_description?.split("\n").map((text, idx) => (
							<span key={text}>{text}</span>
						))}
					</p>
				</div>
				<Tags
					tagsString={tags}
					filterText={filterText}
					onClick={updateFilterText}
				/>
			</dd>
		</dl>
	);
}
