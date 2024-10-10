import Image from "components/image";
import LinkedInLogoImage from "public/icons/Linkedin.svg";

export default function LinkedInLogo(props) {
	return <Image image={LinkedInLogoImage} alt="LinkedIn logo" {...props} />;
}
