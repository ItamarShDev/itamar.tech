import { useContext, useEffect, useState } from "react";
import { getAttributesData, getResumeData } from "lib/resume";
import { Job } from "components";
import { ThemeContext } from "lib/hooks";
export function FilterJobs({ jobs, updateJobs }) {
    const { theme } = useContext(ThemeContext);
    const [resultCount, setResultCount] = useState(null);
    useEffect(() => {
        const _jobs = jobs.slice(0).reverse();
        updateJobs(_jobs);
    }, [jobs]);

    const filterJobs = (e) => {
        const text = e.target.value.toLowerCase();
        const _jobs = jobs
            .slice(0)
            .reverse()
            .filter((item) => {
                const hasTag = item.tags.some((tag) =>
                    tag.toLowerCase().includes(text)
                );
                const hasTitle = item.title.toLowerCase().includes(text);
                return hasTag || hasTitle;
            });
        if (text) {
            setResultCount(_jobs.length);
        } else {
            setResultCount(null);
        }
        updateJobs(_jobs);
    };
    return (
        <div className="container">
            <label>
                Filter by tags
                <input
                    className="job-filter"
                    type="text"
                    onChange={filterJobs}
                    autoComplete="off"
                />
                <span className="results">
                    {resultCount > 0 && `${resultCount} results found`}
                </span>
            </label>
            <style jsx>
                {`
                    label {
                        display: flex;
                        flex-direction: column;
                        color: ${theme.text};
                        font-size: 1rem;
                        padding-block-start: 2rem;
                        padding-inline-start: 5px;
                        margin: 2rem 0;
                    }
                    input.job-filter {
                        color: ${theme.text};
                        line-height: 4rem;
                        padding: 0 2rem;
                        font-size: 1.5rem;
                        display: flex;
                        align-items: start;
                        flex-direction: column;
                        background-color: ${theme.inputs};
                        opacity: 0.5;
                        border-radius: 1.5rem;
                        margin-block-start: 1rem;
                    }
                    input.job-filter:focus,
                    input.job-filter:hover {
                        opacity: 1;
                    }
                    .results {
                        color: gray;
                        font-style: italic;
                        font-size: 1rem;
                        height: 2rem;
                        line-height: 2rem;
                        padding-inline-start: 2rem;
                    }
                    input,
                    input:focus {
                        outline: none;
                        border: none;
                    }
                `}
            </style>
        </div>
    );
}
export default function Resume({ theme, resumeData, attributesData }) {
    const [opened, setOpened] = useState(0);
    const [jobs, setJobs] = useState([]);

    return (
        <section>
            <FilterJobs jobs={resumeData.jobs} updateJobs={setJobs} />
            <div className="timeline">
                {jobs.map((job, index) => (
                    <Job key={index} job={job} />
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
                    padding-left: 2.2rem;
                    margin: 0 auto;
                }
                .timeline::before {
                    content: "";
                    width: 0.3rem;
                    height: 100%;
                    background: ${theme.subText};
                    position: absolute;
                    top: 0;
                    left: 0.5rem;
                    border-radius: 4rem 4rem;
                }
            `}</style>
        </section>
    );
}

export async function getStaticProps({ params }) {
    const resumeData = await getResumeData();
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
