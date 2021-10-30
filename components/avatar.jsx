import Image from "components/image";
import { useScreenSize } from "lib/hooks";
import AvatarImg from "public/images/me.png";
export default function Avatar() {
    const { isMobile } = useScreenSize();
    let imageProps = {
        size: "inherit",
        layout: "responsive",
    };
    if (isMobile) {
        imageProps = {
            ...imageProps,
            layout: "fill",
            objectFit: "cover",
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
