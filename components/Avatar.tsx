import Image from "components/image";
import { useScreenSize } from "lib/hooks";
import AvatarImg from "public/images/me.png";
import styles from "./Avatar.module.css";

export default function Avatar() {
	const { isMobile } = useScreenSize();
	let imageProps = {
		size: "inherit",
		layout: "fill",
		objectFit: "cover",
	};
	if (isMobile) {
		imageProps = {
			...imageProps,
			objectFit: "contain",
			objectPosition: "0% 50%",
		};
	}
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
