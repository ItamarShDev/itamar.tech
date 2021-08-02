import TwitterLogoImage from "public/icons/twitter.svg";
import Image from "components/image";

export default function TwitterLogo(props) {
    return <Image image={TwitterLogoImage} alt="Twitter logo" {...props} />;
}
