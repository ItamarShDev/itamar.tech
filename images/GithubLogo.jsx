import Image from "components/image";
import GithubLogoImage from "public/icons/github.svg";

export default function GithubLogo(props) {
	return <Image image={GithubLogoImage} alt="Github logo" {...props} />;
}
