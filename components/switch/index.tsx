import type { InputHTMLAttributes } from "react";
import styles from "./style.module.css";
export function Switch({
	checked,
	onChange,
	selectedText,
	unselectedText,
	id,
}: {
	checked: boolean;
	onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
	selectedText?: string;
	unselectedText?: string;
	id: string;
}) {
	return (
		<label htmlFor={id} className={styles.switch}>
			<input
				type="checkbox"
				name={id}
				id={id}
				checked={checked}
				onChange={onChange}
			/>
			<span
				className={styles.slider}
				data-label={checked ? selectedText : unselectedText}
			/>
		</label>
	);
}
