import styles from "./Input.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export function Input({ label, children, ...props }: IProps) {
	return (
		<label className={styles.label}>
			{label}
			<input {...props} className={styles.input} />
			{children}
		</label>
	);
}
