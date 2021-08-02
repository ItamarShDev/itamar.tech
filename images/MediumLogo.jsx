import MediumLogoImage from "public/icons/medium.svg";
import Image from "components/image";

export default function MediumLogo(props) {
    return <Image image={MediumLogoImage} alt="Medium logo" {...props} />;
}
