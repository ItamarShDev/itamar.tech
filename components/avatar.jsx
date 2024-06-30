import Image from "components/image";
import { useScreenSize } from "lib/hooks";
import AvatarImg from "public/images/me.png";
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
		<span className="avatar">
			<Image
				image={AvatarImg}
				alt="my picture"
				title="Me, preparing for my wedding"
				{...imageProps}
			/>
			<style jsx>{`
                .avatar {
                    z-index: -1;
                    height: inherit;
                    width: auto;
                }
            `}</style>
		</span>
	);
}
