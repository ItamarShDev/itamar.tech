import NextImage from "next/image";

export default function Image({
    src,
    url = null,
    alt,
    title = null,
    className = "",
    size = "100%",
    circle = false,
    objectFit = "contain",
    layout = "fill",
}) {
    const imageSrc = url || `/${src}`;
    return (
        <div className={className} title={title}>
            <NextImage
                layout={layout}
                key={imageSrc}
                src={imageSrc}
                alt={alt}
                objectFit={objectFit}
                objectPosition="50% 50%"
            />

            <style jsx>{`
                div {
                    position: relative;
                    overflow: hidden;
                    height: ${size};
                    border-radius: ${circle ? "50%" : 0};
                    text-align: center;
                    line-height: ${size};
                }
            `}</style>
        </div>
    );
}
