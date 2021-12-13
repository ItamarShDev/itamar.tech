import { Job } from "lib/types/jobs";

export function filterJobsByText(jobs: Job[], text: string = ""): Job[] {
    return jobs
        .slice(0)
        .reverse()
        .filter((item) => {
            const lc_text = text.toLowerCase();
            const hasTag = item.tags.some((tag) =>
                tag.toLowerCase().includes(lc_text)
            );
            const hasTitle = item.title.toLowerCase().includes(lc_text);
            const hasDescription = item.description
                .toLowerCase()
                .includes(lc_text);

            return hasTag || hasTitle || hasDescription;
        });
}
