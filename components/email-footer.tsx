import styles from "./EmailFooter.module.css";

const EmailFooter = ({ title, text }) => {
	return (
		<footer className={styles.emailFooter}>
			<p>{text}</p>
			<a href={`mailto:example@example.com?subject=${title}`}>Send Email</a>
		</footer>
	);
};

export default EmailFooter;
