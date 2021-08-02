import GithubLogoImage from "public/icons/github.svg";
import Image from "components/image";

export default function GithubLogo(props) {
    return <Image image={GithubLogoImage} alt="Github logo" {...props} />;
}
