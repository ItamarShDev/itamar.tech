import NextImage from "next/image";

export default function Image({
    alt,
    title = null,
    className = "",
    size = "100%",
    circle = false,
    objectFit = "contain",
    layout = "fill",
    image = null,
}) {
    return (
        <div className={className} title={title}>
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

            <style jsx>{`
                div {
                    position: relative;
                    overflow: visible;
                    height: ${size};
                    border-radius: ${circle ? "50%" : 0};
                    text-align: center;
                    line-height: ${size};
                }
            `}</style>
        </div>
    );
}
