"use client";

import type { Properties } from "components/properies";
import { useEffect, useMemo, useRef, useState } from "react";
import RankJson from "../../static-props/technologies.json";
import styles from "./PropertiesSelect.module.css";

import { filterItems } from "lib/utils/array";
import { 
  handleTagInputKeyDown, 
  removeTag as removeTagUtil, 
  removeLastTag as removeLastTagUtil,
  addTag as addTagUtil
} from "lib/utils/tags";

const filterSkills = (skills: string[], tags: string[], text: string) =>
  filterItems(skills, tags, text);

interface PropertiesSelectProps {
	properties: Properties;
	setSelectedSkills: (skills: string[]) => void;
	qualificationText: string;
}

export default function PropertiesSelect({
	properties,
	setSelectedSkills,
	qualificationText,
}: PropertiesSelectProps) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [inputText, setInputText] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const inputEl = useRef<HTMLInputElement>(null);

	const skills = Object.keys(properties);

	const filteredSkills = useMemo(
		() => {
			const filtered = filterSkills(skills, tags, inputText);
			// Only sort when input is focused and there's no search text
			if (isInputFocused) {
				return filtered.sort((a, b) => (RankJson[b as keyof typeof RankJson] || 0) - (RankJson[a as keyof typeof RankJson] || 0));
			}
			return filtered;
		},
		[skills, tags, inputText, isInputFocused]
	);

	const showResults = filteredSkills.length > 0 && isInputFocused;

	useEffect(() => {
		setSelectedSkills(tags);
		setCurrentIndex(0);
	}, [tags, setSelectedSkills]);

	const addToResults = (skill: string) => {
		setTags(addTagUtil(tags, skill));
		setInputText("");
	};

	const focusInput = () => inputEl?.current?.focus();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const newIndex = handleTagInputKeyDown(
			e,
			currentIndex,
			filteredSkills,
			(item) => {
				if (showResults) {
					setTags(addTagUtil(tags, item));
					setInputText("");
				}
			},
			() => setInputText(""),
			() => setTags(removeLastTagUtil(tags))
		);
		setCurrentIndex(newIndex);
	};

	const removeTag = (tagName: string) => {
		setTags(removeTagUtil(tags, tagName));
	};

	const removeLastTag = () => {
		setTags(removeLastTagUtil(tags));
	};

	return (
		<div className={styles.matcher}>
			<label htmlFor="search-technologies" className={styles.label}>
				Search for tech
				{qualificationText && (
					<span className={styles.matchText}> - {qualificationText}</span>
				)}
			</label>
			<div className={styles.container}>
				<div
					className={styles.inputContainer}
					onFocus={focusInput}
					onClick={focusInput}
				>
					<div className={styles.tags}>
						{tags.map((tag) => (
							<div className={styles.tag} key={tag}>
								{tag}
								<span
									className={styles.removeTag}
									onClick={() => removeTag(tag)}
								>
									x
								</span>
							</div>
						))}
					</div>
					<input
						type="text"
						id="search-technologies"
						list="technologies"
						ref={inputEl}
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						onKeyDown={handleKeyDown}
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => {
							setTimeout(() => setIsInputFocused(false), 200);
						}}
						className={styles.input}
						autoComplete="off"
					/>
				</div>
				<div className={styles.resultsContainer}>
					<ul
						id="technologies"
						className={styles.results}
						hidden={!showResults}
					>
						{filteredSkills.map((skill, index) => (
							<li
								key={skill}
								className={index === currentIndex ? styles.selected : ""}
								onMouseEnter={() => setCurrentIndex(index)}
								onMouseDown={(e) => {
									addToResults(skill);
									e.stopPropagation();
								}}
							>
								{skill}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
