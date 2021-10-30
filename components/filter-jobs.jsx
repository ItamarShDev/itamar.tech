import { useEffect, useState } from "react";

export function FilterJobs({ jobs, updateJobs }) {
    const [resultCount, setResultCount] = useState(null);
    useEffect(() => {
        const _jobs = jobs.slice(0).reverse();
        updateJobs(_jobs);
    }, [jobs, updateJobs]);

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
                        color: var(--colors-text);
                        font-size: 1rem;
                        padding-block-start: 2rem;
                        padding-inline-start: 5px;
                        margin: 2rem 0;
                    }
                    input.job-filter {
                        color: var(--colors-text);
                        line-height: 4rem;
                        padding: 0 2rem;
                        font-size: 1.5rem;
                        display: flex;
                        align-items: start;
                        flex-direction: column;
                        background-color: var(--colors-inputs);
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
