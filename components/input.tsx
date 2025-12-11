import { forwardRef } from "react";
import styles from "./Input.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input = forwardRef<HTMLInputElement, IProps>(({ label, children, ...props }, ref) => {
	return (
		<label className={styles.label}>
			{label}
			<input {...props} className={styles.input} ref={ref} />
			{children}
		</label>
	);
});

Input.displayName = 'Input';
