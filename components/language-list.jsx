import LibrariesAndLanguagesLogos from "images/LibrariesAndLanguagesLogos";
import { centered, grid } from "theme/styles";

export default function LanguagesList() {
	const { className, styles } = grid({
		rows: 2,
		cols: 4,
		gap: "0.5rem",
		height: "5rem",
		width: "5rem",
	});
	const { className: centerClass, styles: centerStyle } = centered({
		isColumns: true,
	});

	return (
		<div className={`languages ${centerClass}`}>
			<div className={className}>
				<LibrariesAndLanguagesLogos />
				{styles}
				{centerStyle}
			</div>
		</div>
	);
}
