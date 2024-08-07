import { Tags } from "components/jobs/tags";
import { useIsRTL } from "lib/hooks/useTranslation";
import type { Job as JobType } from "lib/types/jobs";

type Props = {
	job: JobType;
	updateFilterText: (filterText: string) => void;
	filterText?: string;
};
export default function Job({ job, updateFilterText, filterText }: Props) {
	const isRTL = useIsRTL();
	const tags = job.tags.join(", ");
	return (
		<dl>
			<dt>
				{job?.duration?.from} - {job?.duration?.to}
			</dt>
			<dd className="box">
				<div className="job">
					<h3 className="title">{job.title}</h3>
					<span className="company">
						<a
							href={job.company.website}
							target="_blank"
							rel="noreferrer noopener"
						>
							{job.company.name}
						</a>
					</span>
				</div>
				<div className="summary">
					<p>
						{job.description.split("\n").map((text, idx) => (
							<span key={text}>{text}</span>
						))}
					</p>
				</div>
				<div className="extra">
					<p>
						{job.elaborated_description.split("\n").map((text, idx) => (
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
			<style jsx>{`
                dl {
                    position: relative;
                }
                p {
                    margin-block: 1rem;
                }
                dl::before {
                    content: "";
                    position: absolute;
                    left: ${isRTL ? "calc(100% + 1.1rem)" : "-2.25rem"};
                    width: 1.5rem;
                    height: 1.5rem;
                    display: flex;
                    color: #ffffff;
                    background-color: var(--colors-decorations);
                    border: 0.2rem solid white;
                    border-radius: 50%;
                }

                dt {
                    font-size: 1.5rem;
                    padding: 1rem;
                    transform: translateY(-0.75rem);
                }

                dd {
                    background-color: var(--colors-hoverDecorations);
                    border-radius: 1em;
                    padding: 1.5em;
                    margin-inline-start: 0.5em;
                    display: flex;
                    flex-direction: column;
                    line-height: 2rem;
                }

                .title {
                    font-size: 2.5rem;
                    line-height: 2.5rem;
                    margin-block: 0.5rem;
                    font-weight: bold;
                    font-family: "Codystar", Arial, Helvetica, sans-serif;
                }

                .company {
                    display: flex;
                    font-size: 1.5rem;
                    font-style: italic;
                    align-items: center;
                    margin-block: 1rem 1.5rem;
                }
                .company a {
                    filter: opacity(0.9);
                    color: var(--colors-subText);
                    text-decoration: none;
                }
                @media (hover: hover) {
                    .company:hover {
                        color: var(--colors-decorations);
                    }
                    .company:hover a {
                        color: var(--colors-decorations);
                        text-decoration: underline double;
                    }
                }
                .company:before {
                    content: "@";
                    font-style: italic;
                    opacity: 0.5;
                    font-size: 1rem;
                    margin: 0 0.5rem;
                }

                .summary {
                    font-family: "Quicksand", sans-serif;
                    font-size: 2rem;
                    break-after: always;
                    white-space: wrap;
                }

                .extra {
                    font-size: 1.5rem;
                    filter: opacity(0.9);
                    font-family: "Roboto", sans-serif;
                }

                @media only screen and (max-width: 968px) {
                    .title {
                        font-size: 2rem;
                    }
                    .summary {
                        font-size: 1.8rem;
                    }
                    .extra {
                        font-size: 1.3rem;
                    }
                }
            `}</style>
		</dl>
	);
}
