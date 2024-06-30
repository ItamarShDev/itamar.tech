import Image from "components/image";
import MediumLogoImage from "public/icons/medium.svg";

export default function MediumLogo(props) {
	return <Image image={MediumLogoImage} alt="Medium logo" {...props} />;
}
