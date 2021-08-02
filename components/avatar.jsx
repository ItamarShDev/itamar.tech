import Image from "components/image";
import AvatarImg from "public/images/me.png";
export default function Avatar() {
    return (
        <span className="avatar">
            <Image
                image={AvatarImg}
                alt="my picture"
                size="inherit"
                objectFit="cover"
                title="Me, preparing for my wedding"
            />
            <style jsx>{`
                .avatar {
                    height: inherit;
                    width: inherit;
                    overflow: hidden;
                }
            `}</style>
        </span>
    );
}
