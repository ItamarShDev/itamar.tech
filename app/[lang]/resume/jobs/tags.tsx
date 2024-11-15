"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./Tags.module.css";
type Base = {
	onClick: (filterText: string) => void;
	filterText?: string;
};
type TagProps = Base & {
	tag: string;
};
function getSearchedTextCompare(filterText: string, tag: string) {
	const terms = filterText
		.toLowerCase()
		.split(/[\s,]+/)
		.map(
			(s) =>
				[tag.toLowerCase().indexOf(s.trim().toLowerCase()), s.trim()] as [
					number,
					string,
				],
		)
		.filter(([t]) => t !== -1)
		.sort((a, b) => b[1].length - a[1].length);

	if (terms.length === 0) return null;
	const [index, searchedText] = terms[0];
	const start = tag.substring(0, index);
	const found = tag.substring(index, index + searchedText.length);
	const end = tag.substring(index + searchedText.length);
	return {
		start,
		found,
		end,
	};
}

function Tag({ tag, filterText = "", onClick }: TagProps) {
	const searchedTags = useMemo(
		() => getSearchedTextCompare(filterText, tag),
		[filterText, tag],
	);
	if (!searchedTags) {
		return (
			<span className={styles.tag} onClick={() => onClick(tag)}>
				{tag}
			</span>
		);
	}
	const { start, found, end } = searchedTags;
	return (
		<span className={styles.tag} onClick={() => onClick(tag)}>
			<span key={start + found + end}>
				{start}
				<span className={styles.highlight}>{found}</span>
				{end}
			</span>
		</span>
	);
}

type TagsProps = Base & {
	tagsString: string;
};

export function Tags({ tagsString, filterText, onClick }: TagsProps) {
	const [tags, setTags] = useState<string[]>([]);
	useEffect(() => {
		setTags(tagsString.split(", "));
	}, [tagsString]);

	return (
		<div className={styles.tags}>
			{tags.map((tag) => (
				<Tag key={tag} tag={tag} filterText={filterText} onClick={onClick} />
			))}
		</div>
	);
}
