import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { BACKSPACE, DOWN, ENTER, ESC, UP } from "utils/key-codes";

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
		<div className="matcher">
			<label htmlFor="search-technologies">
				Search for tech
				{qualificationText && (
					<span className="match-text"> - {qualificationText}</span>
				)}
			</label>
			<div className="container">
				<div
					className="input-container"
					onFocus={focusInput}
					onClick={focusInput}
					onBlur={() => setShowResults(false)}
				>
					<div className="tags">
						{tags.map((tag) => (
							<div className="tag" key={tag}>
								{tag}
								<span className="remove-tag" onClick={() => removeTag(tag)}>
									x
								</span>
							</div>
						))}
					</div>
					<input
						type="text"
						// biome-ignore lint/a11y/noAutofocus: I want it
						autoFocus
						id="search-technologies"
						list="technologies"
						ref={inputEl}
						placeholder="search"
						onChange={(e) => setInputText(e.target.value)}
						onKeyDown={moveSelection}
						value={inputText}
					/>
				</div>
				<div className="results-container">
					{showResults && filteredSkills.length > 0 && (
						<ul id="technologies" className="results">
							{filteredSkills.map((skill, index) => (
								<li
									key={skill}
									className={index === hovered ? "selected" : ""}
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
			<style jsx>{`
                label {
                    display: block;
                    color: var(--colors-text);
                    font-size: 1.5rem;
                    margin-block-end: 0.5rem;
                }
                input,
                input:focus {
                    outline: none;
                    border: none;
                }
                input {
                    line-height: 3rem;
                    background-color: transparent;
                    color: var(--colors-text);
                    font-size: 1.5rem;
                }

                .matcher,
                .container,
                .input-container,
                .tags {
                    position: relative;
                    width: 100%;
                    display: block;
                }

                .input-container {
                    border: 1px dashed var(--colors-decorations);
                    padding: 0.5rem;
                }

                .tags {
                    display: flex;
                    flex-wrap: wrap;
                    overflow: auto;
                }
                .tag {
                    box-shadow: 0 0s 1px 1px var(--colors-decorations);
                    font-size: 1.3rem;
                    line-height: 3rem;
                    height: 3rem;
                    margin: 0.5rem;
                    padding: 0 0.8rem;
                    border-radius: 0.5rem;
                    background-color: var(--colors-decorations);
                    color: white;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    animation: fade-in 0.2s, zoom-in 0.1s;
                }
                .remove-tag {
                    cursor: pointer;
                    margin: 0.5rem;
                    font-size: 1.1rem;
                }
                .results-container {
                    position: relative;
                    width: 100%;
                }
                ul {
                    width: inherit;
                    max-height: 200px;
                    font-size: 1.5rem;
                    overflow-y: auto;
                    position: absolute;
                    z-index: 1;
                    list-style-type: none;
                    padding: 0.5rem;
                    margin: 0;
                    box-shadow: 0 2px 5px 0 var(--colors-decorations);
                    background-color: var(--colors-bg);
                    color: var(--colors-text);
                    text-transform: capitalize;
                }
                li {
                    cursor: default;
                    padding: 0.5rem;
                    border: 1px dotted var(--colors-hoverDecorations);
                }
                li.selected {
                    background-color: var(--colors-decorations);
                    color: white;
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes zoom-in {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }
            `}</style>
		</div>
	);
}
