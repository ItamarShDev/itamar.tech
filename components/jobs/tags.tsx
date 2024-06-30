import { useIsRTL } from "lib/hooks/useTranslation";
import { useEffect, useState } from "react";

type TagProps = {
	tag: string;
	onClick: (filterText: string) => void;
	filterText: string;
};

function Tag({ tag, filterText = "", onClick }: TagProps) {
	const isActive = filterText.toLowerCase() === tag.toLowerCase();
	const className = isActive ? "tag active" : "tag";
	return (
		<span className={className} onClick={() => onClick(tag)}>
			{tag}
			<style jsx>{`
                .tag {
                    cursor: pointer;
                }
                .active {
                    background-color: var(--colors-decorations);
                }
                .tag:hover {
                    text-decoration: dotted underline;
                }
            `}</style>
		</span>
	);
}

type TagsProps = {
	tagsString: string;
	filterText: string;
	onClick: (filterText: string) => void;
};
export function Tags({ tagsString, filterText, onClick }: TagsProps) {
	const [tags, setTags] = useState<string[]>([]);
	const isRTL = useIsRTL();
	useEffect(() => {
		setTags(tagsString.split(", "));
	}, [tagsString]);

	return (
		<div className="tags">
			{tags.map((tag) => (
				<Tag key={tag} tag={tag} filterText={filterText} onClick={onClick} />
			))}
			<style jsx>{`
                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: ${isRTL ? "row-reverse" : "row"};
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    font-size: 1rem;
                    gap: 5px;
                    font-style: italic;
                    filter: opacity(0.7);
                }
            `}</style>
		</div>
	);
}
