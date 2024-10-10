import Image from "components/image";
import AvatarImg from "public/images/me.png";
import styles from "./Avatar.module.css";

export default function Avatar() {
	const imageProps = {
		objectFit: "contain",
		objectPosition: "0% 50%",
	};

	return (
		<span className={styles.avatar}>
			<Image
				image={AvatarImg}
				alt="my picture"
				title="Me, preparing for my wedding"
				{...imageProps}
			/>
		</span>
	);
}
