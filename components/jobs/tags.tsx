"use client";
import { useIsRTL } from "lib/hooks/useTranslation";
import { useEffect, useState } from "react";
import styles from "./Tags.module.css";

type TagProps = {
	tag: string;
	onClick: (filterText: string) => void;
	filterText: string;
};

function Tag({ tag, filterText = "", onClick }: TagProps) {
	const isActive = filterText.toLowerCase() === tag.toLowerCase();
	const className = isActive ? `${styles.tag} ${styles.active}` : styles.tag;
	return (
		<span className={className} onClick={() => onClick(tag)}>
			{tag}
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
		<div className={`${styles.tags} ${isRTL ? styles.rtl : ""}`}>
			{tags.map((tag) => (
				<Tag key={tag} tag={tag} filterText={filterText} onClick={onClick} />
			))}
		</div>
	);
}
