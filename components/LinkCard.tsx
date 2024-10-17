import Link from "next/link";
import styles from "./LinkCard.module.css";

export default function LinkCard({
	route,
	title,
	subTitle,
	routeRef = null,
	date = null,
	children = null,
	newTab = false,
}) {
	return (
		<Link
			href={routeRef || route}
			as={route}
			target={newTab ? "_blank" : "_self"}
			className={styles.linkCard}
		>
			<dl>
				<dt className={styles.title}>{title}</dt>
				<dd className={styles.description}>
					<span>{subTitle}</span>
					<span>{date}</span>
				</dd>
				{children}
			</dl>
		</Link>
	);
}
