import { Input } from "components/input";
import type { Job } from "lib/types/jobs";
import type { InputChangeEvent } from "lib/types/react";
import { useEffect, useState, useMemo, useRef } from "react";
import styles from "./FilterJobs.module.css";

type Suggestion = {
	text: string;
	type: 'company' | 'tag' | 'title';
	count: number;
};

type Props = {
	jobs: Job[];
	updateFilterText: (filterText: string) => void;
	filterText: string;
};

export function FilterJobs({ jobs, updateFilterText, filterText }: Props) {
	const [resultCount, setResultCount] = useState<number>(0);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);

	// Extract all searchable suggestions
	const suggestions = useMemo(() => {
		const companies = new Map<string, number>();
		const tags = new Map<string, number>();
		const titles = new Map<string, number>();

		jobs.forEach(job => {
			// Company suggestions
			const companyCount = companies.get(job.company.name) || 0;
			companies.set(job.company.name, companyCount + 1);

			// Tag suggestions
			job.tags.forEach(tag => {
				const tagCount = tags.get(tag) || 0;
				tags.set(tag, tagCount + 1);
			});

			// Title suggestions (extract key terms)
			const titleWords = job.title.toLowerCase().split(/\s+/);
			titleWords.forEach(word => {
				if (word.length > 2) { // Only include words longer than 2 chars
					const titleCount = titles.get(word) || 0;
					titles.set(word, titleCount + 1);
				}
			});
		});

		const allSuggestions: Suggestion[] = [
			...Array.from(companies.entries()).map(([text, count]) => ({ text, type: 'company' as const, count })),
			...Array.from(tags.entries()).map(([text, count]) => ({ text, type: 'tag' as const, count })),
			...Array.from(titles.entries()).map(([text, count]) => ({ text, type: 'title' as const, count })),
		];

		return allSuggestions.sort((a, b) => b.count - a.count);
	}, [jobs]);

	// Filter suggestions based on input
	const filteredSuggestions = useMemo(() => {
		if (!filterText) return suggestions.slice(0, 10); // Show top 10 when no input
		
		const searchTerm = filterText.toLowerCase();
		return suggestions
			.filter(suggestion => 
				suggestion.text.toLowerCase().includes(searchTerm)
			)
			.slice(0, 8); // Limit to 8 results
	}, [filterText, suggestions]);

	useEffect(() => {
		if (filterText) {
			setResultCount(jobs.length);
		} else {
			setResultCount(0);
		}
	}, [filterText, jobs]);

	const handleInputChange = (e: InputChangeEvent) => {
		const text = e.target.value;
		updateFilterText(text);
		setShowSuggestions(true);
		setSelectedIndex(-1);
	};

	const handleSuggestionClick = (suggestion: Suggestion) => {
		updateFilterText(suggestion.text);
		setShowSuggestions(false);
		setSelectedIndex(-1);
		inputRef.current?.blur();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!showSuggestions) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setSelectedIndex(prev => 
					prev < filteredSuggestions.length - 1 ? prev + 1 : 0
				);
				break;
			case 'ArrowUp':
				e.preventDefault();
				setSelectedIndex(prev => 
					prev > 0 ? prev - 1 : filteredSuggestions.length - 1
				);
				break;
			case 'Enter':
				e.preventDefault();
				if (selectedIndex >= 0) {
					handleSuggestionClick(filteredSuggestions[selectedIndex]);
				}
				break;
			case 'Escape':
				setShowSuggestions(false);
				setSelectedIndex(-1);
				break;
		}
	};

	const handleBlur = () => {
		// Delay hiding suggestions to allow click events
		setTimeout(() => setShowSuggestions(false), 150);
	};

	const hasResults = resultCount > 0;

	return (
		<div className={styles.autocompleteContainer}>
			<div className={styles.inputWrapper}>
				<Input
					label="Filter jobs"
					type="text"
					value={filterText}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
					onFocus={() => setShowSuggestions(true)}
					autoComplete="off"
					ref={inputRef}
				>
					<span className={styles.results}>
						{hasResults && `${resultCount} results found`}
					</span>
				</Input>
			</div>
			
			{showSuggestions && filteredSuggestions.length > 0 && (
				<div className={styles.suggestionsDropdown}>
					{filteredSuggestions.map((suggestion, index) => (
						<div
							key={`${suggestion.text}-${suggestion.type}`}
							className={`${styles.suggestion} ${index === selectedIndex ? styles.selected : ''}`}
							onClick={() => handleSuggestionClick(suggestion)}
							onMouseEnter={() => setSelectedIndex(index)}
						>
							<span className={styles.suggestionText}>{suggestion.text}</span>
							<span className={styles.suggestionType}>{suggestion.type}</span>
							<span className={styles.suggestionCount}>({suggestion.count})</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
