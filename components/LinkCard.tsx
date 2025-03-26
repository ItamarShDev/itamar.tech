import Link from "next/link";
import styles from "./LinkCard.module.css";

export default function LinkCard({
	route,
	title,
	subTitle,
	routeRef,
	date,
	children,
	newTab = false,
}: {
	route: string;
	title: string;
	subTitle: string;
	routeRef?: string;
	date?: string;
	children?: React.ReactNode;
	newTab?: boolean;
}) {
	return (
		<Link
			href={routeRef || route}
			as={route}
			target={newTab ? "_blank" : "_self"}
			prefetch={true}
			className={styles.linkCard}
		>
			<dl>
				<dt className={styles.title}>{title}</dt>
				<dd className={styles.description}>
					<span>{subTitle}</span>
					<span className={styles.date}>{date}</span>
				</dd>
				{children}
			</dl>
		</Link>
	);
}
