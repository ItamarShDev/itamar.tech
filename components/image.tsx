import NextImage from "next/legacy/image";
import styles from "./Image.module.css";

interface ImageProps {
	alt: string;
	title?: string;
	className?: string;
	size?: string;
	circle?: boolean;
	objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
	layout?: "fixed" | "fill" | "responsive" | "intrinsic";
	image: string;
}

export default function Image({
	alt,
	title,
	className = "",
	size = "100%",
	circle = false,
	objectFit = "contain",
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
				objectFit={objectFit}
				objectPosition="50% 50%"
			/>
		</div>
	);
}
