import HomeBackground from "layouts/home-background";
import HomePage from "layouts/home-page";

export default function Home() {
    return (
        <>
            <HomeBackground />
            <HomePage />
        </>
    );
}
export async function getStaticProps({ params }) {
    return {
        props: {
            isCentered: false,
        },
    };
}
