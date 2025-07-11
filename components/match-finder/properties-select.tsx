"use client";

import type { Properties } from "components/properies";
import { useEffect, useMemo, useRef, useState } from "react";
import RankJson from "../../static-props/technologies.json";
import styles from "./PropertiesSelect.module.css";

const filterSkills = (skills: string[], tags: string[], text: string) =>
	text.length > 0 ? skills.filter(
		(skill) =>
			skill.toLowerCase().includes(text.toLowerCase()) && !tags.includes(skill),
	) : skills;

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
		setTags([...tags, skill]);
		setInputText("");
	};

	function focusInput() {
		inputEl?.current?.focus();
	}

	function moveSelection(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowDown") {
			setCurrentIndex((currentIndex + 1) % filteredSkills.length);
		} else if (e.key === "ArrowUp") {
			const newItem = currentIndex === 0 ? filteredSkills.length : currentIndex;
			setCurrentIndex((newItem - 1) % filteredSkills.length);
		} else if (e.key === "Enter") {
			const current = filteredSkills[currentIndex];
			if (current && showResults) addToResults(current);
		} else if (e.key === "Escape") {
			setInputText("");
		} else if (e.key === "Backspace" && inputText === "") {
			removeLastTag();
		}
	}

	function removeLastTag() {
		const _tags = [...tags];
		_tags.pop();
		setTags(_tags);
	}

	function removeTag(tagName: string) {
		setTags(tags.filter((tag) => tag !== tagName));
	}

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
						placeholder="search"
						onChange={(e) => setInputText(e.target.value)}
						onKeyDown={moveSelection}
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => {
							setTimeout(() => setIsInputFocused(false), 200);
						}}
						value={inputText}
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
