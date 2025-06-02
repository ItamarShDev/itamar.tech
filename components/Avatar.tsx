import Image from "components/image";
import AvatarImg from "../images/me.png";
import styles from "./Avatar.module.css";

export default function Avatar() {
	return (
		<span className={styles.avatar}>
			<Image
				image={AvatarImg}
				alt="my picture"
				title="Me, preparing for my wedding"
				style={{
					objectFit: "contain",
					objectPosition: "0% 50%",
				}}
			/>
		</span>
	);
}
