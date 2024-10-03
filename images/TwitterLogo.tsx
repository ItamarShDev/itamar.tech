import Image from "components/image";
import TwitterLogoImage from "public/icons/twitter.svg";

export default function TwitterLogo(props) {
	return <Image image={TwitterLogoImage} alt="Twitter logo" {...props} />;
}
