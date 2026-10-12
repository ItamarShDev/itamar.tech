export default function Mark({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 200 200"
			fill="none"
			aria-hidden="true"
		>
			<path d="M0 0h90v90H0z" fill="currentColor" />
			<path
				d="M110 0a90 90 0 0 1 90 90h-90zM0 110h90v90A90 90 0 0 1 0 110Z"
				fill="#d99b7f"
			/>
			<circle cx="155" cy="155" r="45" fill="#c7c5df" />
			<path d="M155 117v76M117 155h76" stroke="#294b3d" strokeWidth="2" />
		</svg>
	);
}
