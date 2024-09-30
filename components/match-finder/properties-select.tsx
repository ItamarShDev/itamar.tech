import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { BACKSPACE, DOWN, ENTER, ESC, UP } from "utils/key-codes";
import styles from "./PropertiesSelect.module.css";

PropertiesSelect.propTypes = {
	skills: PropTypes.arrayOf(PropTypes.string),
	theme: PropTypes.object,
	updateSelectedJobs: PropTypes.func,
};

/**
 * @param {Array<string>} skills
 * @param {Array<string>} tags
 * @param {string} text
 */
function filterSkills(skills, tags, text) {
	return Array.from(skills).filter(
		(item) =>
			item.toLowerCase().includes(text.toLowerCase()) && !tags.includes(item),
	);
}

export default function PropertiesSelect({
	properties,
	setSelectedSkills,
	qualificationText,
}) {
	const [filteredSkills, setFilteredSkills] = useState([]);
	const [hovered, setHovered] = useState(0);
	const [inputText, setInputText] = useState("");
	const [tags, setTags] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const inputEl = useRef(null);

	const skills = Object.keys(properties);
	useEffect(() => {
		setFilteredSkills(filterSkills(skills, tags, inputText));
		const shouldShowResults = filteredSkills.length > 0 && inputText.length > 0;
		setShowResults(shouldShowResults);
		setHovered(0);
	}, [inputText, tags, skills, filteredSkills]);

	useEffect(() => {
		setSelectedSkills(tags);
	}, [tags, setSelectedSkills]);
	/**
	 * @param {any} skill
	 */
	const addToResults = (skill) => {
		setShowResults(false);
		setTags([...tags, skill]);
		setInputText("");
	};
	function focusInput() {
		inputEl?.current?.focus();
		setShowResults(true);
	}

	/**
	 * @param {{ keyCode: any; }} e
	 */
	function moveSelection(e) {
		const code = Number.parseInt(e.keyCode);
		if (code === DOWN) {
			if (!showResults) {
				setShowResults(true);
				return;
			}
			setHovered((hovered + 1) % filteredSkills.length);
		} else if (code === UP) {
			if (!showResults) {
				setShowResults(true);
				return;
			}
			const newItem = hovered === 0 ? filteredSkills.length : hovered;
			setHovered((newItem - 1) % filteredSkills.length);
		} else if (code === ENTER) {
			const current = filteredSkills[hovered];
			if (current && showResults) addToResults(current);
		} else if (code === ESC) {
			setInputText("");
		} else if (code === BACKSPACE && inputText === "") {
			removeLastTag();
		}
	}
	function removeLastTag() {
		const _tags = [...tags];
		_tags.pop();
		setTags(_tags);
	}

	/**
	 * @param {any} tagName
	 */
	function removeTag(tagName) {
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
					onBlur={() => setShowResults(false)}
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
						// biome-ignore lint/a11y/noAutofocus: <explanation>
						autoFocus
						id="search-technologies"
						list="technologies"
						ref={inputEl}
						placeholder="search"
						onChange={(e) => setInputText(e.target.value)}
						onKeyDown={moveSelection}
						value={inputText}
						className={styles.input}
					/>
				</div>
				<div className={styles.resultsContainer}>
					{showResults && filteredSkills.length > 0 && (
						<ul id="technologies" className={styles.results}>
							{filteredSkills.map((skill, index) => (
								<li
									key={skill}
									className={index === hovered ? styles.selected : ""}
									onMouseEnter={() => setHovered(index)}
									onMouseDown={(e) => {
										addToResults(skill);
										e.stopPropagation();
									}}
								>
									{skill}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
