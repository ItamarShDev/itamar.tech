import NextImage, { type ImageProps as NextImageProps } from "next/image";

import styles from "./Image.module.css";

type ImageProps = {
	alt: string;
	size?: string;
	circle?: boolean;
	layout?: "fixed" | "fill" | "responsive" | "intrinsic";
	image: NextImageProps["src"];
} & Omit<NextImageProps, "src">;

export default function Image({
	alt,
	title,
	className = "",
	size = "100%",
	circle = false,
	layout = "fill",

	image,
}: ImageProps) {
	return (
		<div
			className={`${styles.imageContainer} ${className}`}
			title={title || undefined}
			style={{
				height: size,
				borderRadius: circle ? "50%" : 0,
				lineHeight: size,
			}}
		>
			<NextImage
				priority
				placeholder="blur"
				layout={layout}
				key={alt}
				src={image}
				blurDataURL={`/_next/image?url=${image}&w=16&q=1`}
				alt={alt}
				style={{
					objectFit: "contain",
					objectPosition: "50% 50%",
				}}
			/>
		</div>
	);
}
