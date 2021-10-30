import React, { useState } from "react";
import { getAttributesData, getResumeData } from "lib/get-data-methods";
import { Job } from "components";
import { FilterJobs } from "components/filter-jobs";

export default function Resume({ resumeData }) {
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
                    background: var(--colors-subText);
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
