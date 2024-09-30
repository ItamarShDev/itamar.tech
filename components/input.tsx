import styles from "./Input.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export function Input({ label, children, ...props }: IProps) {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				{label}
				<input className={styles.input} {...props} />
				{children}
			</label>
		</div>
	);
}
